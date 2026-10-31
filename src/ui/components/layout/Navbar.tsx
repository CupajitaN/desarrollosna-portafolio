import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Logo } from "../common/Logo";

const links = [
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "proceso", label: "Proceso" },
  { id: "sobre-mi", label: "Sobre mí" },
];

/** Devuelve el id de la sección visible en el centro del viewport */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const targets = ["hero", ...links.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const active = useActiveSection(location.pathname === "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/", { state: { scrollTo: id } });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          scrolled ? "max-w-5xl px-3 pt-3" : "max-w-7xl px-4 sm:px-6 pt-5"
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled
              ? "h-16 px-4 bg-brand-bg/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40"
              : "h-16 px-2 border border-transparent"
          }`}
        >
          <Link to="/" aria-label="Desarrollos NA — Inicio" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="Principal">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={goToSection(l.id)}
                  className={`relative px-4 py-2 rounded-full transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contacto"
              className="hidden sm:inline-flex group items-center gap-1.5 rounded-full bg-white text-brand-bg text-sm font-semibold px-4 py-2 hover:bg-brand-accent transition-colors"
            >
              Hablemos
              <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile burger */}
            <button
              className="md:hidden relative w-11 h-11 rounded-xl grid place-items-center text-slate-200 hover:bg-white/10"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
            >
              <span className={`absolute h-0.5 w-6 bg-current rounded transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[7px]"}`} />
              <span className={`absolute h-0.5 w-6 bg-current rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-6 bg-current rounded transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[7px]"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 -z-10 bg-brand-bg/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
            <nav className="relative h-full flex flex-col justify-center gap-2 px-8" aria-label="Móvil">
              {[...links, { id: "contacto", label: "Contacto" }].map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                >
                  {l.id === "contacto" ? (
                    <Link
                      to="/contacto"
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-3 text-4xl font-display font-bold text-white hover:text-brand-accent"
                    >
                      <span className="text-sm font-mono text-brand-accent">0{i + 1}</span>
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={`/#${l.id}`}
                      onClick={goToSection(l.id)}
                      className="flex items-baseline gap-4 py-3 text-4xl font-display font-bold text-white hover:text-brand-accent"
                    >
                      <span className="text-sm font-mono text-brand-accent">0{i + 1}</span>
                      {l.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
