import { Link } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";
import { FiArrowUpRight } from "react-icons/fi";
import { ProjectSkeleton } from "../common/ProjectSkeleton";
import { SectionHeading } from "../common/SectionHeading";
import { motion } from "framer-motion";

// Patrón bento: grande, pequeño, pequeño, grande...
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Projects() {
  const { data, loading, error } = useProjects();

  return (
    <section id="proyectos" className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Proyectos"
        title={<>Trabajo real, <span className="text-gradient">resultados reales</span></>}
        description="Una selección de plataformas, aplicaciones y sitios que he diseñado y desarrollado de punta a punta."
      />

      <div className="mt-14">
        {error ? (
          <p className="text-red-400">No se pudieron cargar los proyectos. Intenta recargar la página.</p>
        ) : loading ? (
          <div className="grid md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)}
          </div>
        ) : !data || data.length === 0 ? (
          <p className="text-slate-400">Pronto compartiré proyectos.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5">
            {data.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={spans[i % spans.length]}
              >
                <Link
                  to={`/proyectos/${p.slug}`}
                  onMouseEnter={(e) => { e.currentTarget.querySelector("video")?.play().catch(() => {}); }}
                  onMouseLeave={(e) => { e.currentTarget.querySelector("video")?.pause(); }}
                  className="group relative flex flex-col h-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-brand-accent/40 transition-colors duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-surface">
                    <img
                      src={p.cover}
                      alt={`Captura del proyecto ${p.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                    {p.video && (
                      <video
                        src={p.video}
                        poster={p.cover}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
                    {p.url && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-brand-bg/80 backdrop-blur px-3 py-1 text-xs font-medium text-emerald-300 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> En producción
                      </span>
                    )}
                    <span className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-white text-brand-bg opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                      <FiArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="relative -mt-14 p-6 md:p-7 flex flex-col flex-1">
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                    <h3 className="mt-1 text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2 flex-1">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
