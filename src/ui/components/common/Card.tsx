import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 shadow-lg">
      {children}
    </div>
  );
}
