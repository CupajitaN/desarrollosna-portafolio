import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Projects } from "../components/sections/Projects";
import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { About } from "../components/sections/About";
import { TechStack } from "../components/sections/TechStack";
import { Process } from "../components/sections/Process";
import { CtaBanner } from "../components/sections/CtaBanner";
import { Seo } from "../components/seo/Seo";
import { ScrollToTopButton } from "../components/common/ScrollToTopButton";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 0);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Seo
        title="Desarrollos NA | Desarrollo web a la medida en Colombia"
        description="Diseño y desarrollo de sitios web, aplicaciones y tiendas online rápidas, seguras y escalables para pymes y emprendedores. Cotiza tu proyecto hoy."
        path="/"
      />
      <Hero />
      <TechStack />
      <Services />
      <Projects />
      <Process />
      <About />
      <CtaBanner />
      <ScrollToTopButton />
    </>
  );
}
