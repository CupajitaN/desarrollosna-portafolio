import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiArrowRight, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { CountUp } from "../common/CountUp";
import { site } from "../../../infrastructure/config/site";

const stats = [
  { value: "4+", label: "Proyectos entregados" },
  { value: "3+", label: "Años de experiencia" },
  { value: "100%", label: "Clientes satisfechos" },
];

const socials = [
  { href: site.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: site.instagram, label: "Instagram", Icon: FiInstagram },
  { href: site.emailQuote, label: "Correo", Icon: FiMail },
];

const words = ["rápidas", "seguras", "escalables", "que venden"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-grid align-bottom overflow-hidden pb-2">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

type Token = [string, string];
const codeLines: Token[][] = [
  [["text-fuchsia-400", "const "], ["text-sky-300", "proyecto"], ["text-slate-400", " = {"]],
  [["text-slate-300", "  cliente: "], ["text-emerald-300", "\"Tu negocio\""], ["text-slate-400", ","]],
  [["text-slate-300", "  stack: ["], ["text-emerald-300", "\"React\""], ["text-slate-400", ", "], ["text-emerald-300", "\"Spring\""], ["text-slate-300", "],"]],
  [["text-slate-300", "  rendimiento: "], ["text-amber-300", "100"], ["text-slate-400", ","]],
  [["text-slate-300", "  seguro: "], ["text-fuchsia-400", "true"], ["text-slate-400", ","]],
  [["text-slate-400", "};"]],
  [],
  [["text-fuchsia-400", "await "], ["text-sky-300", "deploy"], ["text-slate-400", "(proyecto);"]],
  [["text-slate-500", "// ✓ En producción en tiempo récord"]],
];

function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200 }}
      className="relative"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-cyan/20 via-brand-accent/10 to-transparent blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-white/10 bg-brand-surface/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-slate-500 font-mono">proyecto.ts</span>
        </div>
        <pre className="p-5 text-[13px] sm:text-sm leading-7 font-mono overflow-x-auto">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.3 }}
              className="flex"
            >
              <span className="w-6 shrink-0 select-none text-slate-600 text-right mr-4">{i + 1}</span>
              <span>
                {line.map(([cls, txt], j) => <span key={j} className={cls}>{txt}</span>)}
                {i === codeLines.length - 1 && (
                  <span className="inline-block w-2 h-4 ml-1 align-middle bg-brand-accent animate-pulse" />
                )}
              </span>
            </motion.div>
          ))}
        </pre>
      </div>

      {/* Insignias flotantes */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 sm:-left-10 -bottom-14 rounded-xl border border-white/10 bg-brand-bg/90 backdrop-blur-xl px-4 py-3 shadow-xl"
      >
        <div className="text-[11px] uppercase tracking-wider text-slate-500">Siempre incluido</div>
        <div className="font-display text-lg font-bold text-emerald-400">SEO · SSL · Responsive</div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 sm:-right-6 -top-5 rounded-xl border border-white/10 bg-brand-bg/90 backdrop-blur-xl px-4 py-2.5 shadow-xl flex items-center gap-2 text-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Deploy exitoso
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative isolate pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
      {/* Fondo: aurora + cuadrícula */}
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
      <div className="absolute -z-10 -top-40 left-[10%] w-[600px] h-[600px] rounded-full bg-brand-cyan/15 blur-[140px] animate-aurora" aria-hidden />
      <div className="absolute -z-10 top-20 right-[5%] w-[500px] h-[500px] rounded-full bg-brand-accent/15 blur-[130px] animate-aurora [animation-delay:-9s]" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-16 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-sm text-slate-300 backdrop-blur">
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Agenda abierta · {new Date().getFullYear()}
          </div>

          <h1 className="mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold text-white">
            Soluciones web <br className="hidden sm:block" />
            <RotatingWord />
          </h1>
          <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Diseño y desarrollo productos digitales de alto rendimiento para pymes y emprendedores:
            desde la idea hasta el deploy, listos para convertir visitantes en clientes.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-accent text-brand-bg font-semibold px-7 py-3.5 shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:brightness-110 transition"
            >
              Solicitar cotización
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] transition"
            >
              Ver proyectos
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 grid place-items-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-brand-accent/60 hover:bg-brand-accent/10 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <span className="h-8 w-px bg-white/10" />
            <span className="text-sm text-slate-500">Respuesta en menos de 24 h</span>
          </div>
        </motion.div>

        <CodeWindow />
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
          {stats.map(({ value, label }) => (
            <div key={label} className="px-3 py-6 md:py-8 text-center">
              <CountUp value={value} className="block font-display text-3xl md:text-5xl font-bold text-gradient" />
              <div className="text-slate-500 text-xs md:text-sm mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
