import { createBrowserRouter } from "react-router-dom";
import Home from "../ui/pages/Home";
import ContactPage from "../ui/pages/ContactPage";
import { ProjectDetailPage } from "../ui/pages/ProjectDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/contacto", element: <ContactPage /> },
  { path: "/proyectos/:slug", element: <ProjectDetailPage /> },
]);
