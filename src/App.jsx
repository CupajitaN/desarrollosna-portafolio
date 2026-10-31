import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { DIProvider } from "./providers/DIProvider";
import Home from "./ui/pages/Home";
import { Navbar } from "./ui/components/layout/Navbar";
import { Footer } from "./ui/components/layout/Footer";
import { ScrollToTop } from "./ui/components/common/ScrollToTop";
import { ScrollProgress } from "./ui/components/common/ScrollProgress";

// Las páginas secundarias se cargan bajo demanda para aligerar la carga inicial
const ContactPage = lazy(() => import("./ui/pages/ContactPage"));
const NotFoundPage = lazy(() => import("./ui/pages/NotFoundPage"));
const ProjectDetailPage = lazy(() =>
  import("./ui/pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage }))
);

function PageFallback() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <span className="h-8 w-8 rounded-full border-2 border-brand-accent/30 border-t-brand-accent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <DIProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          <div className="relative min-h-screen text-white overflow-x-clip">
            <Navbar />
            <main>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </DIProvider>
  );
}
