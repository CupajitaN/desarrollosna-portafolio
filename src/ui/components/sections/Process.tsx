import { Search, PenTool, CodeXml, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../common/SectionHeading";

const steps = [
  {
    Icon: Search,
    title: "Descubrimiento",
    body: "Entiendo tu negocio, tus clientes y tus objetivos para definir el alcance correcto desde el inicio.",
  },
  {
    Icon: PenTool,
    title: "Diseño y prototipo",
    body: "Bocetos y prototipos navegables para validar la experiencia antes de escribir una línea de código.",
  },
  {
    Icon: CodeXml,
    title: "Desarrollo iterativo",
    body: "Entregas frecuentes que puedes revisar. Código limpio, probado y pensado para crecer.",
  },
  {
    Icon: Rocket,
    title: "Lanzamiento y soporte",
    body: "Deploy en la nube, dominio, SEO y acompañamiento después de salir a producción.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        align="center"
        eyebrow="Cómo trabajo"
        title={<>Un proceso claro, <span className="text-gradient">sin sorpresas</span></>}
        description="Sabrás en todo momento en qué punto está tu proyecto y qué viene después."
      />

      <div className="relative mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Línea conectora en escritorio */}
        <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />

        {steps.map(({ Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            className="relative text-center lg:px-2"
          >
            <div className="relative mx-auto w-16 h-16 rounded-2xl grid place-items-center bg-brand-surface border border-white/10 shadow-lg shadow-black/30">
              <Icon className="w-7 h-7 text-brand-cyan" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full grid place-items-center text-[11px] font-bold bg-brand-accent text-brand-bg">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
