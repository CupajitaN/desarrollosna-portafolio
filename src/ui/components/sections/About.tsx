import { ShieldCheck, Code2, Rocket } from "lucide-react";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Highlight = { icon: ReactNode; title: string; body: string };

const highlights: Highlight[] = [
  {
    icon: <ShieldCheck className="text-brand-accent w-6 h-6" />,
    title: "Calidad + seguridad",
    body: "Buenas prácticas, testing y revisión de código para minimizar riesgos y reducir tiempos de soporte.",
  },
  {
    icon: <Code2 className="text-brand-accent w-6 h-6" />,
    title: "Arquitectura limpia",
    body: "Principios SOLID y arquitectura por capas para código mantenible que escala sin deuda técnica.",
  },
  {
    icon: <Rocket className="text-brand-accent w-6 h-6" />,
    title: "Orientado al negocio",
    body: "Cada decisión técnica genera valor real: menos bugs, más velocidad de entrega, más conversiones.",
  },
];

export function About() {
  return (
    <section id="sobre-mi" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">Sobre mí</h2>
        <div className="h-[3px] w-24 mt-4 bg-brand-accent" />
      </motion.div>

      <motion.div
        className="mt-10 grid md:grid-cols-2 gap-10 items-start"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Bio */}
        <div>
          <p className="text-slate-300 leading-relaxed text-base">
            Soy{" "}
            <span className="text-white font-semibold">Nicolás Cupajita</span>, Full Stack
            Developer enfocado en resultados. Ayudo a pymes y emprendedores a construir productos
            digitales que realmente aporten al negocio — desde el diseño hasta el deploy.
          </p>
          <p className="text-slate-400 leading-relaxed mt-4 text-sm">
            No solo entrego código: entrego soluciones. Me encargo de arquitectura, seguridad,
            rendimiento y experiencia de usuario para que tu producto destaque y convierta.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="flex items-start gap-4 rounded-2xl p-5 bg-slate-900/60 border border-slate-800 hover:border-brand-accent/40 transition-colors"
            >
              <div className="mt-0.5 shrink-0">{h.icon}</div>
              <div>
                <h4 className="text-white font-semibold">{h.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
