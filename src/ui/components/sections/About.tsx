import { ShieldCheck, CodeXml, TrendingUp, MapPin } from "lucide-react";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../common/SectionHeading";
import { SpotlightCard } from "../common/SpotlightCard";

type Highlight = { icon: ReactNode; title: string; body: string };

const highlights: Highlight[] = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Calidad + seguridad",
    body: "Buenas prácticas, testing y revisión de código para minimizar riesgos y reducir tiempos de soporte.",
  },
  {
    icon: <CodeXml className="w-5 h-5" />,
    title: "Arquitectura limpia",
    body: "Principios SOLID y arquitectura por capas para código mantenible que escala sin deuda técnica.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Orientado al negocio",
    body: "Cada decisión técnica genera valor real: menos bugs, más velocidad de entrega, más conversiones.",
  },
];

export function About() {
  return (
    <section id="sobre-mi" className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <SectionHeading
            eyebrow="Sobre mí"
            title={<>Código que <span className="text-gradient">impulsa negocios</span></>}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <p className="mt-6 text-slate-300 leading-relaxed text-lg">
              Soy <span className="text-white font-semibold">Nicolás Cupajita</span>, Full Stack
              Developer enfocado en resultados. Ayudo a pymes y emprendedores a construir productos
              digitales que realmente aporten al negocio — desde el diseño hasta el deploy.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              No solo entrego código: entrego soluciones. Me encargo de arquitectura, seguridad,
              rendimiento y experiencia de usuario para que tu producto destaque y convierta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-cyan" /> Colombia · Trabajo remoto
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Disponible para proyectos
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <SpotlightCard className="flex items-start gap-5 p-6">
                <span className="grid place-items-center shrink-0 w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                  {h.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{h.title}</h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">{h.body}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
