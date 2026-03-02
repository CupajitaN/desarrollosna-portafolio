export function ProjectSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 animate-pulse">
      <div className="aspect-video bg-slate-800/80" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-800 rounded w-2/3" />
        <div className="h-3 bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-800 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 bg-slate-800 rounded-full" />
          <div className="h-5 w-16 bg-slate-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
