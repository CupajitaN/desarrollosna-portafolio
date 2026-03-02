import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function CtaBanner() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-brand-accent/30 bg-gradient-to-br from-brand-accent/15 to-emerald-600/10 p-10 md:p-14 text-center"
      >
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-brand-accent/20 blur-[80px]" />

        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase relative z-10">
          ¿Tienes un proyecto en mente?
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 relative z-10">
          Llevemos tu negocio al siguiente nivel
        </h2>
        <p className="text-slate-300 mt-4 max-w-xl mx-auto relative z-10">
          Cuéntame tu idea y en menos de 24 horas te respondo con una propuesta personalizada sin compromiso.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-emerald-400 text-brand-bg font-semibold py-3 px-8 rounded-xl transition shadow-lg shadow-brand-accent/25 text-base"
          >
            Solicitar cotización
          </Link>
          <a
            href="https://wa.me/573106408460?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-accent/60 text-white font-semibold py-3 px-8 rounded-xl transition text-base"
          >
            <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
