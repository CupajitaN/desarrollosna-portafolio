import { Link } from "react-router-dom";
import { Mail, ArrowUpRight } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { Logo } from "../common/Logo";
import { site } from "../../../infrastructure/config/site";

const nav = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#sobre-mi", label: "Sobre mí" },
];

const socials = [
  { href: site.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: site.instagram, label: "Instagram", Icon: FiInstagram },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-10 overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 text-slate-400 max-w-sm leading-relaxed">
            Desarrollo web a la medida para pymes y emprendedores. Sitios, aplicaciones y
            plataformas rápidas, seguras y escalables.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-6 inline-flex items-center gap-2 text-white font-medium hover:text-brand-accent transition"
          >
            <Mail className="w-4 h-4 text-brand-accent" />
            {site.email}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
          </a>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">Navegación</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-slate-300 hover:text-white transition">{n.label}</a>
              </li>
            ))}
            <li>
              <Link to="/contacto" className="text-slate-300 hover:text-white transition">Contacto</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">Redes</h2>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 grid place-items-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-brand-accent/60 hover:bg-brand-accent/10 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Desarrollos NA. Todos los derechos reservados.</span>
          <span>Hecho con React, TypeScript y mucho café ☕</span>
        </div>
      </div>

      {/* Marca de agua gigante */}
      <div
        className="pointer-events-none select-none text-center font-display font-bold leading-none text-[18vw] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.06] to-transparent -mb-[4vw]"
        aria-hidden
      >
        DESARROLLOS
      </div>
    </footer>
  );
}
