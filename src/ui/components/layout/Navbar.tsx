import { useState, useEffect } from "react";
import logo from "../../../assets/desarrollosnablanco.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-brand-bg/80 backdrop-blur-md border-b border-white/10
        h-20 sm:h-24 md:h-28 lg:h-32
        pt-[env(safe-area-inset-top)]
      "
    >
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="Desarrollos NA"
            className="
              block w-auto
              h-16 sm:h-20 md:h-24 lg:h-28
              origin-left scale-[1.35]    /* booster por si el PNG tiene aire */
            "
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          <a
            href="/#servicios"
            onClick={goToSection("servicios")}
            className="hover:text-brand-accent text-base lg:text-lg"
          >
            Servicios
          </a>
          <a
            href="/#proyectos"
            onClick={goToSection("proyectos")}
            className="hover:text-brand-accent text-base lg:text-lg"
          >
            Proyectos
          </a>
          <a
            href="/#sobre-mi"
            onClick={goToSection("sobre-mi")}
            className="hover:text-brand-accent text-base lg:text-lg"
          >
            Sobre mí
          </a>
          <Link
            to="/contacto"
            className="hover:text-brand-accent text-base lg:text-lg"
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/10"
          aria-label="Abrir menú"
          onClick={() => setOpen(s => !s)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Fondo oscuro clickeable */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />

         {/* Panel debajo del navbar */}
          <nav
            className="
              absolute left-0 right-0
              top-20 sm:top-24 md:top-28 lg:top-32
              bg-slate-900 text-white   /* fondo sólido oscuro */
              border-b border-white/10 shadow-xl
              px-4 py-4
              animate-[slideDown_180ms_ease-out]
            "
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-7xl mx-auto flex flex-col gap-3">
              <a
                href="/#servicios"
                onClick={goToSection('servicios')}
                className="py-2 text-lg hover:text-brand-accent"
              >
                Servicios
              </a>
              <a
                href="/#proyectos"
                onClick={goToSection('proyectos')}
                className="py-2 text-lg hover:text-brand-accent"
              >
                Proyectos
              </a>
              <a
                href="/#sobre-mi"
                onClick={goToSection('sobre-mi')}
                className="py-2 text-lg hover:text-brand-accent"
              >
                Sobre mí
              </a>
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="py-2 text-lg hover:text-brand-accent"
              >
                Contacto
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
