import { Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "../../ui/components/sections/ContactForm";
import { Seo } from "../components/seo/Seo";
import { site } from "../../infrastructure/config/site";

const channels = [
  { Icon: Mail, title: "Correo", value: site.email, href: site.emailQuote },
  { Icon: Clock, title: "Tiempo de respuesta", value: "Menos de 24 horas" },
];

export default function ContactPage() {
  return (
    <section className="relative isolate pt-36 md:pt-44 pb-16 px-4 sm:px-6">
      <Seo
        title="Contacto — Desarrollos NA"
        description="Cuéntame tu proyecto web y te respondo en menos de 24 horas con una propuesta personalizada sin compromiso."
        path="/contacto"
      />
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
      <div className="absolute -z-10 -top-32 right-[10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/15 blur-[130px] animate-aurora" aria-hidden />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent">
            <span className="h-px w-6 bg-brand-accent" /> Contacto
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-[1.05]">
            Hablemos de <span className="text-gradient">tu proyecto</span>
          </h1>
          <p className="text-slate-400 mt-5 text-lg leading-relaxed">
            Cuéntame qué necesitas: una landing, una app a medida o una tienda online. Te respondo con
            una propuesta clara, tiempos y presupuesto.
          </p>

          <ul className="mt-10 space-y-3">
            {channels.map(({ Icon, title, value, href }) => {
              const content = (
                <>
                  <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">{title}</span>
                    <span className="block text-white font-medium break-all">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={title}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-brand-accent/40 transition"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
