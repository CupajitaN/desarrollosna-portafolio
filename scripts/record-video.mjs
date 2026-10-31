// Graba un recorrido con scroll suave de una URL y lo guarda como MP4 liviano.
// Uso: node scripts/record-video.mjs <url> <salida.mp4> [segundos=12]
// Requiere Microsoft Edge (o Chrome vía BROWSER_PATH) y ffmpeg en el PATH.
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const [, , url, output, secondsArg = "12"] = process.argv;
if (!url || !output) {
  console.error("Uso: node scripts/record-video.mjs <url> <salida.mp4> [segundos]");
  process.exit(1);
}

const BROWSER =
  process.env.BROWSER_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9444;
const WIDTH = 1440;
const HEIGHT = 900;
const SCROLL_MS = Number(secondsArg) * 1000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const work = mkdtempSync(path.join(tmpdir(), "rec-"));

const browser = spawn(BROWSER, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--mute-audio",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${path.join(work, "profile")}`,
  `--window-size=${WIDTH},${HEIGHT}`,
  "about:blank",
]);

try {
  // Espera a que el navegador exponga el protocolo DevTools
  let target;
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find((t) => t.type === "page");
    } catch { /* aún iniciando */ }
  }
  if (!target) throw new Error("No se pudo conectar con el navegador");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  const frames = [];
  ws.addEventListener("message", async (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === "Page.screencastFrame") {
      frames.push({ data: msg.params.data, t: msg.params.metadata.timestamp });
      send("Page.screencastFrameAck", { sessionId: msg.params.sessionId });
    }
  });
  const send = (method, params = {}) =>
    new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url });
  await sleep(4000); // carga inicial, fuentes e imágenes

  await send("Page.startScreencast", { format: "jpeg", quality: 90, maxWidth: WIDTH, maxHeight: HEIGHT });
  await sleep(1500); // pausa en la portada
  await send("Runtime.evaluate", {
    awaitPromise: true,
    expression: `new Promise((done) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const start = performance.now();
      const ease = (t) => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
      (function step(now) {
        const t = Math.min(1, (now - start) / ${SCROLL_MS});
        // "instant" evita que un scroll-behavior: smooth del sitio frene la animación
        scrollTo({ top: max * ease(t), behavior: "instant" });
        t < 1 ? requestAnimationFrame(step) : done();
      })(start);
    })`,
  });
  await sleep(800); // pausa al final
  await send("Page.stopScreencast");
  ws.close();

  if (frames.length < 2) throw new Error("No se capturaron fotogramas");

  // Los fotogramas llegan solo cuando cambia la pantalla: se respeta su duración real
  const lines = [];
  frames.forEach((f, i) => {
    const file = path.join(work, `f${String(i).padStart(5, "0")}.jpg`);
    writeFileSync(file, Buffer.from(f.data, "base64"));
    const next = frames[i + 1];
    lines.push(`file '${file.replace(/\\/g, "/")}'`);
    lines.push(`duration ${next ? Math.max(0.001, next.t - f.t).toFixed(4) : 1}`);
  });
  lines.push(lines[lines.length - 2]);
  const list = path.join(work, "frames.txt");
  writeFileSync(list, lines.join("\n"));

  execFileSync("ffmpeg", [
    "-loglevel", "error", "-y",
    "-f", "concat", "-safe", "0", "-i", list,
    "-vf", "fps=30,scale=1280:-2:flags=lanczos,format=yuv420p",
    "-c:v", "libx264", "-preset", "slow", "-crf", "28",
    "-movflags", "+faststart", "-an",
    output,
  ], { stdio: "inherit" });
  console.log(`Video listo: ${output} (${frames.length} fotogramas)`);
} finally {
  browser.kill();
  await sleep(500);
  rmSync(work, { recursive: true, force: true });
}
