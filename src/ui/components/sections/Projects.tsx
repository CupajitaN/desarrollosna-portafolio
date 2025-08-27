import { Link } from "react-router-dom";
import { Card } from "../common/Card";
import { useProjects } from "../../../hooks/useProjects";

export function Projects() {
  const { data, loading, error } = useProjects();

  if (loading) return <p className="text-slate-300">Cargando proyectos…</p>;
  if (error)   return <p className="text-red-400">Error cargando proyectos</p>;
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-slate-300">Pronto compartiré proyectos.</p>;
  }

  return (
    <section id="proyectos" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold">PROYECTOS</h2>
      <div className="h-[3px] w-24 mt-4 bg-brand-accent" />
      <div className="mt-10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-lg border border-white/10">
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {data.map((p) => (
            <Link key={p.id} to={`/proyectos/${p.slug}`}>
              <Card>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-800/80 mb-4">
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-slate-400 text-sm">{p.stack.join(", ")}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
