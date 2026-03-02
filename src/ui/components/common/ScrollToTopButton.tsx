import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-24 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-bg transition-all duration-300 shadow-lg"
    >
      <FiArrowUp className="w-5 h-5" />
    </button>
  );
}
