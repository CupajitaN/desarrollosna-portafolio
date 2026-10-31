const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

// 1) Config
const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const PROJECTS_JSON = path.join(PUBLIC_DIR, "projects.json");

// Normaliza el dominio: Google exige URLs absolutas con protocolo y sin "/" final
function normalizeSiteUrl(raw) {
  let url = String(raw).trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url;
}

const SITE_URL = normalizeSiteUrl(
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://www.desarrolloscn.com"
);

// Rutas estáticas de tu sitio
const STATIC_ROUTES = [
  "/",           // Home
  "/contacto",   // Contacto
];

// Prioridades sugeridas
const PRIORITY_BY_PATH = (p) => {
  if (p === "/") return 1.0;
  if (p.startsWith("/proyectos/")) return 0.8;
  if (p === "/contacto") return 0.7;
  return 0.5;
};

function toISODate(date = new Date()) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
}

async function readProjects() {
  try {
    const raw = await fsp.readFile(PROJECTS_JSON, "utf-8");
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Espera objetos { slug: string, ... }
    return arr
      .filter((p) => p && typeof p.slug === "string" && p.slug.trim() !== "")
      .map((p) => `/proyectos/${encodeURIComponent(p.slug)}`);
  } catch (err) {
    // Si no existe o hay error, seguimos con rutas estáticas
    console.warn("[sitemap] No se pudo leer projects.json:", err.message);
    return [];
  }
}

function buildSitemapXml(urls) {
  const lastmod = toISODate();
  const xmlItems = urls
    .map((u) => {
      const loc = escapeXml(`${SITE_URL}${u}`);
      const priority = PRIORITY_BY_PATH(u).toFixed(1);
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems}
</urlset>
`;
}

async function writeRobotsTxt() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  const out = path.join(PUBLIC_DIR, "robots.txt");
  await fsp.writeFile(out, robots, "utf-8");
  console.log(`[sitemap] robots.txt actualizado -> ${out}`);
}

async function main() {
  await fsp.mkdir(PUBLIC_DIR, { recursive: true });

  const dynamicRoutes = await readProjects();
  const allRoutes = Array.from(new Set([...STATIC_ROUTES, ...dynamicRoutes])).sort();

  const xml = buildSitemapXml(allRoutes);
  const out = path.join(PUBLIC_DIR, "sitemap.xml");
  await fsp.writeFile(out, xml, "utf-8");
  console.log(`[sitemap] sitemap.xml generado con ${allRoutes.length} rutas (${SITE_URL}) -> ${out}`);

  await writeRobotsTxt();
}

main().catch((e) => {
  console.error("[sitemap] Error:", e);
  process.exit(1);
});
