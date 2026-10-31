import { type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Tarjeta con halo que sigue al cursor. Actualiza variables CSS sin re-renderizar. */
export function SpotlightCard({ children, className = "" }: Props) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={`spotlight rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
