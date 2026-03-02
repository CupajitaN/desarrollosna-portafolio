import { Link } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";
import { FiArrowRight } from "react-icons/fi";
import { ProjectSkeleton } from "../common/ProjectSkeleton";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Projects() {
  const { data, loading, error } = useProjects();

  if (error) return <p className="text-red-400">Error cargando proyectos</p>;

  return (
    <section id="proyectos" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">PROYECTOS</h2>
        <div className="h-[3px] w-24 mt-4 bg-brand-accent" />
      </motion.div>

      <div className="mt-10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-lg border border-white/10">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)}
          </div>
        ) : !data || data.length === 0 ? (
          <p className="text-slate-300">Pronto compartiré proyectos.</p>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {data.map((p) => (
              <motion.div key={p.id} variants={item}>
                <Link
                  to={`/proyectos/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent/10 hover:-translate-y-1"
                >
                  <div className="aspect-video overflow-hidden bg-slate-800/80">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-white">{p.title}</h4>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-brand-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Ver proyecto <FiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
