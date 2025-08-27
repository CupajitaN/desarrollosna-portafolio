import { useParams, Link } from "react-router-dom";
import { useProjectBySlug } from "../../hooks/useProjectBySlug";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Seo } from "../components/seo/Seo";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { data: project, loading, error } = useProjectBySlug(slug);
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 8 },
    rubberband: false,
    renderMode: "performance",
    slideChanged(s) { setCurrent(s.track.details.rel); },
  });

  if (loading) return <div className="max-w-5xl mx-auto p-6">Cargando…</div>;
  if (error || !project) return <div className="max-w-5xl mx-auto p-6">Proyecto no encontrado.</div>;

  const ogCover = project.cover || project.images?.[0] || "/preview.png";

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
      <Seo
        title={`${project.title} — Desarrollos NA`}
        description={project.description}
        ogImage={ogCover}
        type="article"
      />

      <Link to="/" className="flex items-center gap-2 text-brand-accent hover:underline">
        <FiArrowLeft className="w-5 h-5" />
        Volver
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mt-4">{project.title}</h1>
      <p className="text-slate-300 mt-2">{project.description}</p>
      <div className="text-slate-400 text-sm mt-1">{project.stack.join(" • ")}</div>

      {/* Carrusel */}
      <div className="relative mt-8">
        <div
          ref={sliderRef}
          className="keen-slider rounded-xl overflow-hidden bg-slate-900/60 border border-slate-700"
          style={{ maxHeight: "70vh" }}
        >
          {project.images.map((src) => (
            <div key={src} className="keen-slider__slide grid place-items-center">
              <div className="w-full aspect-[16/9]">
                <img
                  src={src}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white w-10 h-10 grid place-items-center"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white w-10 h-10 grid place-items-center"
          aria-label="Siguiente"
        >
          ›
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {project.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`h-2 w-2 rounded-full ${current === idx ? "bg-brand-accent" : "bg-white/30"}`}
              aria-label={`Ir a la imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
