export function ProjectSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 animate-pulse">
      <div className="aspect-[16/10] bg-white/[0.05]" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-white/[0.06] rounded w-1/2" />
        <div className="h-3 bg-white/[0.05] rounded w-full" />
        <div className="h-3 bg-white/[0.05] rounded w-5/6" />
        <div className="flex gap-2 pt-3">
          <div className="h-6 w-16 bg-white/[0.05] rounded-full" />
          <div className="h-6 w-16 bg-white/[0.05] rounded-full" />
        </div>
      </div>
    </div>
  );
}
