import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { env } from "../../../infrastructure/config/env";

const COOLDOWN_SECONDS = 50;                 
const COOLDOWN_KEY = "contactCooldownUntil";

function getCooldownRemaining(): number {
  const v = localStorage.getItem(COOLDOWN_KEY);
  if (!v) return 0;
  const until = Number(v);
  const remaining = Math.max(0, Math.ceil((until - Date.now()) / 1000));
  return remaining;
}

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState<number>(getCooldownRemaining());

  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    company: "", 
  });

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = setInterval(() => setCooldownLeft(getCooldownRemaining()), 500);
    return () => clearInterval(id);
  }, [cooldownLeft]);

  useEffect(() => {
    setCooldownLeft(getCooldownRemaining());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startCooldown = () => {
    const until = Date.now() + COOLDOWN_SECONDS * 1000;
    localStorage.setItem(COOLDOWN_KEY, String(until));
    setCooldownLeft(getCooldownRemaining());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1) Cooldown
    if (cooldownLeft > 0) {
      Swal.fire({
        icon: "info",
        title: "Espera un momento",
        text: `Puedes volver a enviar el formulario en ${cooldownLeft} segundos.`,
        confirmButtonColor: "#14b8a6",
      });
      return;
    }

    // 2) Honeypot
    // Si 'company' viene con contenido, tratamos como "spam" y no hacemos envío real.
    if (form.company.trim().length > 0) {
      startCooldown(); // activamos cooldown para bots
      // Responder "éxito" silencioso para no dar pistas al bot
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        text: "Gracias por escribir. Te contactaré pronto.",
        confirmButtonColor: "#14b8a6",
      });
      setForm({ name: "", email: "", title: "", message: "", company: "" });
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        env.EMAILJS_SERVICE_ID,
        env.EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: form.title,
          message: form.message,
        },
        env.EMAILJS_PUBLIC_KEY
      );

      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Gracias por escribir. Te contactaré pronto.",
        confirmButtonColor: "#14b8a6",
      });
      setForm({ name: "", email: "", title: "", message: "", company: "" });

      // Activar cooldown real después de un envío exitoso
      startCooldown();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Ups, algo salió mal",
        text: "No se pudo enviar el mensaje. Intenta de nuevo.",
        confirmButtonColor: "#14b8a6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white">Contáctame</h2>
      <div className="h-[3px] w-24 mt-4 bg-emerald-400/90" />

      <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
        {/* HONEYPOT (visual/semántico oculto) */}
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

        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo"
          value={form.email}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="text"
          name="title"
          placeholder="Asunto"
          value={form.title}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <textarea
          name="message"
          placeholder="Escribe tu mensaje..."
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          disabled={loading || cooldownLeft > 0}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading
            ? "Enviando..."
            : cooldownLeft > 0
              ? `Espera ${cooldownLeft}s…`
              : "Enviar mensaje"}
        </button>
      </form>
    </section>
  );
}
