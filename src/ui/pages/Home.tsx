import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Projects } from "../components/sections/Projects";
import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { About } from "../components/sections/About";
import { TechStack } from "../components/sections/TechStack";
import { Seo } from "../components/seo/Seo";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as any)?.scrollTo as string | undefined;
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
        title="Desarrollos NA | Portafolio"
        description="Transformo ideas en productos digitales que generan impacto."
        ogImage="/preview.png"
      />
      <section id="hero"><Hero /></section>
      <section id="servicios"><Services /></section>
      <section id="proyectos"><Projects /></section>
      <TechStack />
      <section id="sobre-mi"><About /></section>
    </>
  );
}
