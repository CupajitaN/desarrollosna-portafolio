import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";

export default function NotFoundPage() {
  return (
    <section className="relative isolate min-h-[85vh] flex flex-col items-center justify-center px-6 pt-24 text-center">
      <Seo title="404 — Página no encontrada | Desarrollos NA" noIndex />
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />

      <div className="font-display text-[9rem] md:text-[12rem] font-bold leading-none text-gradient select-none">
        404
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">Página no encontrada</h1>
      <p className="text-slate-400 mt-3 max-w-sm">
        La URL que buscas no existe o fue movida. Vuelve al inicio y explora el portafolio.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-brand-bg font-semibold py-3 px-7 hover:bg-brand-accent transition"
      >
        ← Volver al inicio
      </Link>
    </section>
  );
}
