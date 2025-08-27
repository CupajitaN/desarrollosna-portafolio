import { FaJava, FaPhp, FaHtml5, FaCss3Alt, FaReact, FaAngular, FaVuejs } from "react-icons/fa";
import { SiTailwindcss, SiLaravel, SiDotnet, SiPython } from "react-icons/si";

type Tech = {
  key: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};
const techs: Tech[] = [
  { key: "java",     label: "Java",     Icon: FaJava,       color: "#007396" },
  { key: "php",      label: "PHP",      Icon: FaPhp,        color: "#777BB4" },
  { key: "html",     label: "HTML5",    Icon: FaHtml5,      color: "#E34F26" },
  { key: "css",      label: "CSS3",     Icon: FaCss3Alt,    color: "#1572B6" },
  { key: "tailwind", label: "Tailwind", Icon: SiTailwindcss,color: "#38BDF8" },
  { key: "laravel",  label: "Laravel",  Icon: SiLaravel,    color: "#FF2D20" },
  { key: "react",    label: "React",    Icon: FaReact,      color: "#61DAFB" },
  { key: "angular",  label: "Angular",  Icon: FaAngular,    color: "#DD0031" },
  { key: "vue",      label: "Vue",      Icon: FaVuejs,      color: "#42B883" },
  { key: "dotnet",   label: ".NET",     Icon: SiDotnet,     color: "#512BD4" },
  { key: "python",   label: "Python",   Icon: SiPython,     color: "#3776AB" },
];

export function TechStack() {
  return (
    <section id="stack" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold">STACK & TECNOLOGÍA</h2>
      <div className="h-[3px] w-24 mt-4 bg-brand-accent" />

      <p className="text-slate-300 mt-6 max-w-3xl">
        Experiencia en frontend y backend con foco en arquitectura limpia, SOLID y despliegue en la nube.
      </p>
      <div className="mt-10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-lg border border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-10">
            {techs.map(({ key, label, Icon, color }) => (
            <div
                key={key}
                className="group rounded-2xl border border-white/10 bg-slate-900/50 p-5 flex items-center gap-3 transition
                        hover:border-brand-accent/60 hover:shadow-lg hover:shadow-emerald-500/10"
                aria-label={label}
                title={label}
            >
                <div className="shrink-0">
                <Icon
                    className="w-10 h-10 transition transform filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                    style={{ color }}
                />
                </div>
                <span className="font-medium text-slate-200">{label}</span>
            </div>
            ))}
        </div>
    </div>
    </section>
  );
}