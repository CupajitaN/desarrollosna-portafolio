import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { site } from "../../../infrastructure/config/site";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-brand-surface px-6 py-16 md:p-20 text-center"
      >
        <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden />
        <div className="absolute -z-10 -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-brand-cyan/25 blur-[120px] animate-aurora" aria-hidden />
        <div className="absolute -z-10 -bottom-40 right-0 w-[400px] h-[300px] rounded-full bg-brand-accent/20 blur-[100px]" aria-hidden />

        <p className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase">
          ¿Tienes un proyecto en mente?
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 max-w-3xl mx-auto leading-[1.05]">
          Llevemos tu negocio al <span className="text-gradient">siguiente nivel</span>
        </h2>
        <p className="text-slate-300 mt-5 max-w-xl mx-auto text-lg">
          Cuéntame tu idea y en menos de 24 horas te respondo con una propuesta personalizada sin compromiso.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-brand-bg font-semibold px-8 py-4 hover:bg-brand-accent transition"
          >
            Solicitar cotización
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.emailQuote}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] text-white font-semibold px-8 py-4 transition"
          >
            <FiMail className="w-5 h-5 text-brand-cyan" />
            Escríbeme un correo
          </a>
        </div>
      </motion.div>
    </section>
  );
}
