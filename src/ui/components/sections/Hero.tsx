import { Link } from "react-router-dom";
import { FiInstagram } from "react-icons/fi";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  { value: "4+", label: "Proyectos entregados" },
  { value: "3+", label: "Años de experiencia" },
  { value: "100%", label: "Clientes satisfechos" },
];

const socials = [
  { href: "https://www.linkedin.com/in/nicolascupajita/", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.instagram.com/desarrollosna", label: "Instagram", Icon: FiInstagram },
  { href: "https://wa.me/573106408460", label: "WhatsApp", Icon: FaWhatsapp },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto text-center overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-brand-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-emerald-600/10 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-sm font-medium mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
        </span>
        Disponible para nuevos proyectos
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
        Soluciones web{" "}
        <span className="bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent">
          rápidas
        </span>
        , seguras y escalables
      </h1>
      <p className="text-slate-300 mt-5 md:text-lg max-w-2xl mx-auto leading-relaxed">
        Desarrollo productos digitales de alto rendimiento que combinan diseño, innovación y
        seguridad. Todo lo que tu negocio necesita para destacar en línea y convertir visitantes en
        clientes.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="#proyectos"
          className="rounded-xl px-6 py-3 font-semibold text-white border border-slate-700 hover:bg-slate-800/50 transition"
        >
          Ver proyectos
        </a>
        <Link
          to="/contacto"
          className="inline-flex items-center gap-2 bg-brand-accent hover:bg-emerald-400 text-brand-bg font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-brand-accent/25"
        >
          Solicitar cotización
        </Link>
      </div>

      {/* Social links */}
      <div className="mt-8 flex justify-center gap-5 text-slate-400">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-brand-accent transition hover:scale-110"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-16 flex flex-wrap justify-center gap-12">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="text-4xl font-extrabold bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent">
              {value}
            </div>
            <div className="text-slate-400 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>
      </motion.div>
    </section>
  );
}
