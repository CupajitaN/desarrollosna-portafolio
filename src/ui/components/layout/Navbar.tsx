import logo from "../../../assets/desarrollosnablanco.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/", { state: { scrollTo: id } });
  };

  return (
    <header className="fixed top-0 w-full bg-brand-bg/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={logo}
              alt="Desarrollos NA"
              className="w-auto cursor-pointer hover:opacity-90 transition"
              style={{ height: "140px" }}
            />
          </Link>
        </div>

        <nav className="hidden md:flex gap-6 text-slate-300 font-medium">
          <a href="/#servicios" onClick={goToSection("servicios")} className="hover:text-brand-accent">Servicios</a>
          <a href="/#proyectos" onClick={goToSection("proyectos")} className="hover:text-brand-accent">Proyectos</a>
          <a href="/#sobre-mi" onClick={goToSection("sobre-mi")} className="hover:text-brand-accent">Sobre mí</a>
          <Link to="/contacto" className="hover:text-brand-accent">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
