import { Card } from "../common/Card"
import { ShieldCheck } from "lucide-react"

export function About() {
  return (
    <section id="sobre-mi" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white">Sobre mí</h2>
      <div className="h-[3px] w-24 mt-4 bg-emerald-400" />

      <div className="grid md:grid-cols-2 gap-8 mt-10 items-center">
        <div className="text-slate-300 leading-relaxed">
          <p>
            Soy Nicolás Cupajita, Full Stack Developer. Ayudo a pymes y emprendedores a construir productos digitales
            que realmente aporten al negocio. Trabajo con arquitectura limpia y principios SOLID para que tu software
            sea mantenible y escale sin dolores.
          </p>
        </div>
        <Card>
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-emerald-400" />
            <div>
              <h4 className="text-white font-semibold">Calidad + seguridad</h4>
              <p className="text-slate-300 text-sm">
                Uso buenas prácticas, testing y revisión de código para minimizar riesgos y reducir tiempos de soporte.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
