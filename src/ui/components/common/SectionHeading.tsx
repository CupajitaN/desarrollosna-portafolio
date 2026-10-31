import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={centered ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent">
        <span className="h-px w-6 bg-brand-accent" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-[1.1]">{title}</h2>
      {description && (
        <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
