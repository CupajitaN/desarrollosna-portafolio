import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, CircleAlert, Info, Send } from "lucide-react";
import { env } from "../../../infrastructure/config/env";
import { site } from "../../../infrastructure/config/site";

const COOLDOWN_SECONDS = 50;
const COOLDOWN_KEY = "contactCooldownUntil";

const LIMITS = { name: 80, email: 120, title: 120, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Cada URL cuenta una vez; los dominios dentro de un correo (juan@gmail.com) no cuentan
const LINK_RE = /(?:https?:\/\/|www\.)\S+|(?<![@\w.-])[a-z0-9-]+\.(?:com|net|org|ru|cn|xyz|top|info|biz)\b/gi;
const MAX_LINKS = 2;
const MIN_FILL_MS = 3000; // una persona no completa el formulario en menos de 3 s

const countLinks = (text: string) => text.match(LINK_RE)?.length ?? 0;

type Status = { kind: "success" | "error" | "info"; text: string } | null;

// localStorage puede fallar en modo privado o con cookies bloqueadas
function readCooldownUntil(): number {
  try { return Number(localStorage.getItem(COOLDOWN_KEY)) || 0; } catch { return 0; }
}

function getCooldownRemaining(): number {
  return Math.max(0, Math.ceil((readCooldownUntil() - Date.now()) / 1000));
}

const emptyForm = { name: "", email: "", title: "", message: "", company: "" };

const inputClass =
  "w-full rounded-xl bg-brand-bg/60 border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 " +
  "focus:outline-none focus:border-brand-accent/60 focus:ring-4 focus:ring-brand-accent/10 transition";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [cooldownLeft, setCooldownLeft] = useState<number>(getCooldownRemaining());
  const [form, setForm] = useState(emptyForm);
  const [openedAt] = useState(() => Date.now());

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = setInterval(() => setCooldownLeft(getCooldownRemaining()), 500);
    return () => clearInterval(id);
  }, [cooldownLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startCooldown = () => {
    try { localStorage.setItem(COOLDOWN_KEY, String(Date.now() + COOLDOWN_SECONDS * 1000)); } catch { /* sin persistencia */ }
    setCooldownLeft(COOLDOWN_SECONDS);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // 1) Cooldown
    if (cooldownLeft > 0) {
      setStatus({ kind: "info", text: `Puedes volver a enviar el formulario en ${cooldownLeft} segundos.` });
      return;
    }

    // 2) Honeypot y trampa de tiempo: si 'company' trae contenido o el formulario se llenó
    //    demasiado rápido es un bot; respondemos "éxito" sin enviar para no darle pistas
    if (form.company.trim().length > 0 || Date.now() - openedAt < MIN_FILL_MS) {
      startCooldown();
      setStatus({ kind: "success", text: "¡Mensaje enviado! Gracias por escribir, te contactaré pronto." });
      setForm(emptyForm);
      return;
    }

    // 3) Validación
    const data = {
      name: form.name.trim(),
      email: form.email.trim(),
      title: form.title.trim(),
      message: form.message.trim(),
    };
    if (!EMAIL_RE.test(data.email)) {
      setStatus({ kind: "error", text: "Revisa tu correo electrónico, parece no ser válido." });
      return;
    }
    if (data.message.length < 10) {
      setStatus({ kind: "error", text: "Cuéntame un poco más sobre tu proyecto (mínimo 10 caracteres)." });
      return;
    }
    // 4) Filtro de enlaces: el spam suele venir cargado de links (y nunca en el nombre)
    if (countLinks(data.name) > 0 || countLinks(`${data.title} ${data.message}`) > MAX_LINKS) {
      setStatus({ kind: "error", text: `Por seguridad, el mensaje no puede incluir más de ${MAX_LINKS} enlaces.` });
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(env.EMAILJS_SERVICE_ID, env.EMAILJS_TEMPLATE_ID, data, {
        publicKey: env.EMAILJS_PUBLIC_KEY,
        blockHeadless: true, // rechaza navegadores automatizados (bots)
        // Segunda capa del límite de envíos, aplicada por el propio SDK de EmailJS
        limitRate: { id: "contact-form", throttle: COOLDOWN_SECONDS * 1000 },
      });
      setStatus({ kind: "success", text: "¡Mensaje enviado! Gracias por escribir, te contactaré pronto." });
      setForm(emptyForm);
      startCooldown();
    } catch (error) {
      console.error(error);
      setStatus({ kind: "error", text: `No se pudo enviar el mensaje. Intenta de nuevo o escríbeme a ${site.email}.` });
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = status?.kind === "success" ? CircleCheck : status?.kind === "error" ? CircleAlert : Info;
  const statusColor =
    status?.kind === "success"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
      : status?.kind === "error"
        ? "border-red-400/30 bg-red-400/10 text-red-200"
        : "border-sky-400/30 bg-sky-400/10 text-sky-200";

  return (
    <div id="contacto" className="rounded-3xl border border-white/10 bg-brand-surface/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/30">
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* HONEYPOT (oculto para personas) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-300">Nombre</span>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              autoComplete="name"
              maxLength={LIMITS.name}
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-300">Correo</span>
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              maxLength={LIMITS.email}
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-300">Asunto</span>
          <input
            type="text"
            name="title"
            placeholder="Ej: Tienda online para mi marca"
            maxLength={LIMITS.title}
            value={form.title}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </label>
        <label className="grid gap-2">
          <span className="flex justify-between text-sm font-medium text-slate-300">
            Mensaje
            <span className="text-xs font-normal text-slate-500">
              {form.message.length}/{LIMITS.message}
            </span>
          </span>
          <textarea
            name="message"
            placeholder="Cuéntame sobre tu proyecto, objetivos y fechas…"
            rows={6}
            maxLength={LIMITS.message}
            value={form.message}
            onChange={handleChange}
            required
            className={`${inputClass} resize-y min-h-[140px]`}
          />
        </label>

        <AnimatePresence>
          {status && (
            <motion.p
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${statusColor}`}
            >
              <StatusIcon className="w-5 h-5 shrink-0" /> {status.text}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={loading || cooldownLeft > 0}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-accent text-brand-bg font-semibold py-4 shadow-lg shadow-brand-accent/20 hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-brand-bg/30 border-t-brand-bg animate-spin" />
              Enviando…
            </>
          ) : cooldownLeft > 0 ? (
            `Espera ${cooldownLeft}s…`
          ) : (
            <>
              Enviar mensaje
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
