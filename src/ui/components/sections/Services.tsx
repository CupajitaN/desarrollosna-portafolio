import { Card } from "../common/Card"

export function Services() {
  const services = [
    { title: "Básico", bullets: ["Landing page + contacto", "Diseño responsive", "Entrega rápida"] },
    { title: "Intermedio", bullets: ["Web corporativa multi-sección", "Integración de APIs", "SEO básico"] },
    { title: "Avanzado", bullets: ["App web completa", "Login y roles", "Panel de administración"] },
    { title: "Premium", bullets: ["Pagos online", "Deploy en la nube", "Soporte dedicado"] },
  ]

  return (
    <section id="servicios" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white">SERVICIOS</h2>
      <div className="h-[3px] w-24 mt-4 bg-emerald-400" />

      {/* Fondo translúcido */}
      <div className="mt-10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-lg border border-white/10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Card key={s.title}>
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <ul className="mt-4 text-slate-200 text-sm space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-emerald-400">●</span> {b}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
