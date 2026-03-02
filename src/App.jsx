import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DIProvider } from "./providers/DIProvider";
import Home from "./ui/pages/Home";
import ContactPage from "./ui/pages/ContactPage";
import NotFoundPage from "./ui/pages/NotFoundPage";
import { ProjectDetailPage } from "./ui/pages/ProjectDetailPage";
import { Navbar } from "./ui/components/layout/Navbar";
import { Footer } from "./ui/components/layout/Footer";
import { ScrollToTop } from "./ui/components/common/ScrollToTop";

export default function App() {
  return (
    <DIProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen text-white">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DIProvider>
  );
}
