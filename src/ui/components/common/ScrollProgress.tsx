import { motion, useScroll, useSpring } from "framer-motion";

/** Barra superior que indica el avance de lectura de la página */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-brand-cyan via-brand-accent to-emerald-300"
    />
  );
}
