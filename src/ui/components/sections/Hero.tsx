import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="py-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
        Soluciones web <span className="text-emerald-400">rápidas</span>, seguras y escalables
      </h1>
      <p className="text-slate-300 mt-4 md:text-lg max-w-2xl mx-auto">
        Desarrollamos productos digitales de alto rendimiento que combinan diseño, innovación y seguridad. Todo lo que necesitas para que tu negocio destaque en línea y llegue a más clientes.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <a href="#proyectos" className="rounded-xl px-5 py-3 font-semibold text-white border border-slate-700 hover:bg-slate-800/50">
          Ver proyectos
        </a>
        <Link
          to="/contacto"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-lg transition"
        >
          Solicitar cotización
        </Link>
      </div>
    </section>
  )
}
