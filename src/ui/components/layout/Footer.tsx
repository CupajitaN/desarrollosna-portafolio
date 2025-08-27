import logo from "../../../assets/desarrollosnablanco.png";
import { Rocket, Mail, Phone, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-deep border-t border-white/10 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Desarrollos NA" className="w-auto" style={{ height: "100px" }} />
        </div>

        {/* Contacto */}
        <div className="text-slate-300 text-sm text-center md:text-left space-y-2">
          <p className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-brand-accent" /> Desarrollo web a la medida
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-accent" /> cupajitan@desarrolloscn.com
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-accent" /> +57 310 6408460
          </p>
        </div>

        {/* Redes */}
        <div className="flex gap-4 text-sm">
          <a href="https://www.instagram.com/desarrollosna" target="_blank" className="flex items-center gap-1 hover:text-brand-accent">
            <Instagram className="w-4 h-4" /> Instagram
          </a>
          <a href="https://wa.me/573106408460" target="_blank" className="flex items-center gap-1 hover:text-brand-accent">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>

      <div className="text-center text-slate-500 text-xs mt-6">
        © {new Date().getFullYear()} Desarrollos NA. Todos los derechos reservados.
      </div>
    </footer>
  );
}
