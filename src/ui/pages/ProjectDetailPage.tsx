import { useParams, Link } from "react-router-dom";
import { useProjectBySlug } from "../../hooks/useProjectBySlug";
import { useProjects } from "../../hooks/useProjects";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Seo } from "../components/seo/Seo";
import { CtaBanner } from "../components/sections/CtaBanner";
import type { Project } from "../../domain/models/Project";

function Gallery({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 12 },
    rubberband: false,
    renderMode: "performance",
    slideChanged(s) { setCurrent(s.track.details.rel); },
  });

  const host = project.url ? new URL(project.url).host : "localhost:4200";

  return (
    <div>
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl shadow-black/40">
        {/* Barra de navegador */}
        <div className="flex items-center gap-2 h-10 px-4 bg-slate-800">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-4 flex-1 max-w-sm truncate rounded-md bg-slate-900 px-3 py-1 text-xs text-slate-400">{host}</span>
        </div>
        <div ref={sliderRef} className="keen-slider">
          {project.images.map((src, idx) => (
            <div key={src} className="keen-slider__slide">
              <div className="w-full aspect-[16/10] bg-white">
                <img
                  src={src}
                  alt={`${project.title} — captura ${idx + 1}`}
                  className="w-full h-full object-contain object-top"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>

        {project.images.length > 1 && (
          <>
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-brand-bg/80 backdrop-blur border border-white/10 text-white hover:bg-white hover:text-brand-bg transition md:opacity-0 md:group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-brand-bg/80 backdrop-blur border border-white/10 text-white hover:bg-white hover:text-brand-bg transition md:opacity-0 md:group-hover:opacity-100"
              aria-label="Imagen siguiente"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
            <span className="absolute bottom-5 right-5 rounded-full bg-brand-bg/80 backdrop-blur border border-white/10 px-3 py-1 text-xs font-mono text-slate-300">
              {current + 1} / {project.images.length}
            </span>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {project.images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {project.images.map((src, idx) => (
            <button
              key={src}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              aria-label={`Ir a la imagen ${idx + 1}`}
              aria-current={current === idx}
              className={`shrink-0 w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition ${
                current === idx ? "border-brand-accent" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { data: project, loading, error } = useProjectBySlug(slug);
  const { data: all } = useProjects();

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <span className="h-8 w-8 rounded-full border-2 border-brand-accent/30 border-t-brand-accent animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24">
        <Seo title="Proyecto no encontrado | Desarrollos NA" noIndex />
        <h1 className="text-3xl font-bold text-white">Proyecto no encontrado</h1>
        <Link to="/" state={{ scrollTo: "proyectos" }} className="mt-6 text-brand-accent hover:underline">
          ← Ver todos los proyectos
        </Link>
      </div>
    );
  }

  const ogCover = project.cover || project.images?.[0] || "/preview.png";
  const idx = all?.findIndex((p) => p.slug === project.slug) ?? -1;
  const next = all && idx >= 0 ? all[(idx + 1) % all.length] : null;

  return (
    <>
      <Seo
        title={`${project.title} — Proyecto | Desarrollos NA`}
        description={project.description}
        ogImage={ogCover}
        type="article"
        path={`/proyectos/${project.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          image: project.images,
          keywords: project.stack.join(", "),
          ...(project.url ? { url: project.url } : {}),
          creator: { "@type": "Person", name: "Nicolás Cupajita" },
        }}
      />

      <section className="relative isolate pt-36 md:pt-44 px-4 sm:px-6">
        <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
        <div className="absolute -z-10 -top-40 left-[20%] w-[600px] h-[500px] rounded-full bg-brand-cyan/15 blur-[140px]" aria-hidden />

        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            state={{ scrollTo: "proyectos" }}
            className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Todos los proyectos
          </Link>

          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05]">{project.title}</h1>
              <p className="text-slate-400 mt-5 text-lg leading-relaxed max-w-2xl">{project.description}</p>
            </div>
            <div className="flex flex-col gap-5 lg:items-end">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-sm px-3 py-1.5 rounded-full bg-white/[0.05] text-slate-200 border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-accent text-brand-bg font-semibold px-6 py-3 hover:brightness-110 transition"
                >
                  <FiExternalLink className="w-4 h-4" />
                  Ver sitio en vivo
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            key={`${project.slug}-gallery`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 space-y-12"
          >
            {project.video && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">Recorrido en video</h2>
                <video
                  src={project.video}
                  poster={project.cover}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40 bg-brand-surface"
                />
              </div>
            )}
            <div>
              {project.video && (
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">Capturas</h2>
              )}
              <Gallery key={project.slug} project={project} />
            </div>
          </motion.div>

          {next && next.slug !== project.slug && (
            <Link
              to={`/proyectos/${next.slug}`}
              className="group mt-20 flex items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 hover:border-brand-accent/40 transition"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Siguiente proyecto</span>
                <div className="mt-2 font-display text-2xl md:text-4xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {next.title}
                </div>
              </div>
              <span className="shrink-0 w-14 h-14 grid place-items-center rounded-full bg-white text-brand-bg group-hover:bg-brand-accent transition">
                <FiArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
