import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/** Anima un valor tipo "4+" o "100%" desde 0 cuando entra en pantalla */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const numeric = match !== null;

  useEffect(() => {
    if (!inView || !ref.current || !numeric) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { node.textContent = `${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, target, suffix, numeric]);

  return (
    <span ref={ref} className={className}>
      {numeric ? `0${suffix}` : value}
    </span>
  );
}
