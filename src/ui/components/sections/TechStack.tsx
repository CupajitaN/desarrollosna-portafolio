import { FaJava, FaPhp, FaHtml5, FaCss3Alt, FaReact, FaAngular, FaVuejs } from "react-icons/fa";
import { SiTailwindcss, SiLaravel, SiDotnet, SiPython, SiSpringboot, SiPostgresql, SiNextdotjs, SiTypescript } from "react-icons/si";
import { type ComponentType, type SVGProps } from "react";

type Tech = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
};

const rowA: Tech[] = [
  { label: "React",       Icon: FaReact,       color: "#61DAFB" },
  { label: "Next.js",     Icon: SiNextdotjs,   color: "#FFFFFF" },
  { label: "TypeScript",  Icon: SiTypescript,  color: "#3178C6" },
  { label: "Angular",     Icon: FaAngular,     color: "#DD0031" },
  { label: "Vue",         Icon: FaVuejs,       color: "#42B883" },
  { label: "Tailwind",    Icon: SiTailwindcss, color: "#38BDF8" },
  { label: "HTML5",       Icon: FaHtml5,       color: "#E34F26" },
  { label: "CSS3",        Icon: FaCss3Alt,     color: "#1572B6" },
];

const rowB: Tech[] = [
  { label: "Java",        Icon: FaJava,        color: "#F89820" },
  { label: "Spring Boot", Icon: SiSpringboot,  color: "#6DB33F" },
  { label: ".NET",        Icon: SiDotnet,      color: "#512BD4" },
  { label: "PHP",         Icon: FaPhp,         color: "#777BB4" },
  { label: "Laravel",     Icon: SiLaravel,     color: "#FF2D20" },
  { label: "Python",      Icon: SiPython,      color: "#3776AB" },
  { label: "PostgreSQL",  Icon: SiPostgresql,  color: "#4169E1" },
];

function MarqueeRow({ items, reverse = false }: { items: Tech[]; reverse?: boolean }) {
  // Se duplica la lista para que el desplazamiento sea continuo
  const loop = [...items, ...items];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <ul
        className={`flex shrink-0 gap-4 pr-4 w-max group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {loop.map(({ label, Icon, color }, i) => (
          <li
            key={`${label}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 hover:border-white/25 hover:bg-white/[0.06] transition"
          >
            <Icon className="w-7 h-7" style={{ color }} />
            <span className="font-medium text-slate-200 whitespace-nowrap">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="stack" aria-label="Stack tecnológico" className="py-16 md:py-20">
      <p className="text-center text-sm text-slate-500 mb-8 px-4">
        Stack con el que construyo — frontend, backend y nube
      </p>
      <div className="space-y-4">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  );
}
