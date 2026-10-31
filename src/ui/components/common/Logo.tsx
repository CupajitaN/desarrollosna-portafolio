/** Logo vectorial de la marca: nítido en cualquier tamaño y sin el peso del PNG */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-accent shadow-lg shadow-brand-cyan/25">
        <span className="absolute inset-[3px] rounded-[9px] border border-brand-bg/40" />
        <span className="font-display font-bold text-lg text-brand-bg leading-none">D</span>
      </span>
      <span className="font-display font-bold tracking-tight leading-none text-white text-lg">
        Desarrollos<span className="text-brand-cyan"> NA</span>
      </span>
    </span>
  );
}
