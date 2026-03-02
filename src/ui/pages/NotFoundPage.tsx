import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";

export default function NotFoundPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <Seo title="404 — Página no encontrada | Desarrollos NA" noIndex />

      <div className="text-[9rem] font-extrabold leading-none bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent select-none">
        404
      </div>

      <h1 className="text-2xl font-bold text-white mt-2">Página no encontrada</h1>
      <p className="text-slate-400 mt-2 max-w-sm">
        La URL que buscas no existe o fue movida. Vuelve al inicio y explora el portafolio.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-brand-accent hover:bg-emerald-400 text-brand-bg font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-brand-accent/25"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
