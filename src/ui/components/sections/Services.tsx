import { Zap, Globe, LayoutDashboard, ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../common/SectionHeading";
import { SpotlightCard } from "../common/SpotlightCard";

type Service = {
  icon: ReactNode;
  title: string;
  sub: string;
  bullets: string[];
  popular?: boolean;
};

const services: Service[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Básico",
    sub: "Presencia online rápida",
    bullets: ["Landing page + contacto", "Diseño responsive", "Entrega en 7 días"],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Intermedio",
    sub: "Sitio corporativo completo",
    bullets: ["Web multi-sección", "Integración de APIs", "SEO básico"],
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Avanzado",
    sub: "App web a medida",
    bullets: ["App web completa", "Login y roles", "Panel de administración"],
    popular: true,
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Premium",
    sub: "Plataforma lista para escalar",
    bullets: ["Pagos online", "Deploy en la nube", "Soporte dedicado"],
  },
];

function ServiceBody({ s }: { s: Service }) {
  return (
    <div className="relative flex flex-col gap-5 h-full p-7">
      <div className="flex items-center justify-between">
        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-accent/10 border border-white/10 text-brand-cyan">
          {s.icon}
        </span>
        {s.popular && (
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-accent text-brand-bg">
            Más popular
          </span>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{s.title}</h3>
        <p className="text-slate-400 text-sm mt-1">{s.sub}</p>
      </div>
      <ul className="text-slate-300 text-sm space-y-3 flex-1 pt-5 border-t border-white/10">
        {s.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 items-start">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-brand-accent" /> {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Servicios"
          title={<>Planes a la medida de <span className="text-gradient">tu etapa</span></>}
          description="Desde tu primera landing hasta una plataforma completa. Cada plan incluye diseño responsive, buenas prácticas de seguridad y acompañamiento."
        />
        <Link
          to="/contacto"
          className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.06] transition"
        >
          Cotizar mi proyecto →
        </Link>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
          >
            {s.popular ? (
              <div className="border-glow h-full rounded-3xl shadow-2xl shadow-brand-accent/10">
                <ServiceBody s={s} />
              </div>
            ) : (
              <SpotlightCard className="h-full">
                <ServiceBody s={s} />
              </SpotlightCard>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
