import { ContactForm } from "../../ui/components/sections/ContactForm";
import { Seo } from "../components/seo/Seo";

export default function ContactPage() {
  return (
    <main className="pt-24">
      <Seo
        title="Contacto — Desarrollos NA"
        description="Cuéntame tu proyecto y te respondo con una propuesta."
      />
      <section className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Hablemos de tu proyecto</h1>
        <p className="text-slate-300 mt-2">
          Cuéntame qué necesitas y te respondo pronto.
        </p>
      </section>

      <ContactForm />
    </main>
  );
}
