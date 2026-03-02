import { Zap, Globe, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Service = {
  icon: ReactNode;
  title: string;
  sub: string;
  bullets: string[];
  popular?: boolean;
};

const services: Service[] = [
  {
    icon: <Zap className="w-7 h-7 text-brand-accent" />,
    title: "Básico",
    sub: "Presencia online rápida",
    bullets: ["Landing page + contacto", "Diseño responsive", "Entrega en 7 días"],
  },
  {
    icon: <Globe className="w-7 h-7 text-brand-accent" />,
    title: "Intermedio",
    sub: "Sitio corporativo completo",
    bullets: ["Web multi-sección", "Integración de APIs", "SEO básico"],
  },
  {
    icon: <LayoutDashboard className="w-7 h-7 text-brand-accent" />,
    title: "Avanzado",
    sub: "App web a medida",
    bullets: ["App web completa", "Login y roles", "Panel de administración"],
    popular: true,
  },
  {
    icon: <ShoppingCart className="w-7 h-7 text-brand-accent" />,
    title: "Premium",
    sub: "Plataforma lista para escalar",
    bullets: ["Pagos online", "Deploy en la nube", "Soporte dedicado"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">SERVICIOS</h2>
        <div className="h-[3px] w-24 mt-4 bg-brand-accent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-lg border border-white/10"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5">
          {services.map((s) => (
            <div
              key={s.title}
              className={`relative rounded-2xl p-6 border flex flex-col gap-4 transition ${
                s.popular
                  ? "bg-brand-accent/10 border-brand-accent/50 shadow-lg shadow-brand-accent/10"
                  : "bg-slate-900/60 border-slate-800 hover:border-brand-accent/30"
              }`}
            >
              {s.popular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-brand-accent text-brand-bg whitespace-nowrap shadow-md shadow-brand-accent/30">
                  ✦ Más popular
                </span>
              )}
              {s.icon}
              <div>
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="text-brand-accent text-xs mt-0.5">{s.sub}</p>
              </div>
              <ul className="text-slate-300 text-sm space-y-2 flex-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 items-start">
                    <span className="text-brand-accent mt-0.5 shrink-0">●</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-emerald-400 text-brand-bg font-semibold py-3 px-8 rounded-xl transition shadow-lg shadow-brand-accent/25"
          >
            Solicitar cotización →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
