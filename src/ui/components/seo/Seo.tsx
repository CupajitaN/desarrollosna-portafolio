import { useEffect } from "react";
import { site } from "../../../infrastructure/config/site";

type SeoProps = {
  title?: string;
  description?: string;
  ogImage?: string; // puede ser /preview.png o URL absoluta
  type?: "website" | "article";
  noIndex?: boolean;
  path?: string; // ruta canónica, p. ej. "/contacto"; por defecto la actual
  jsonLd?: Record<string, unknown>; // datos estructurados específicos de la página
};

export function Seo({
  title = "Desarrollos NA | Desarrollo web a la medida en Colombia",
  description = "Soluciones digitales modernas: sitios web, aplicaciones y sistemas escalables hechos a medida.",
  ogImage = "/preview.png",
  type = "website",
  noIndex = false,
  path,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    // Siempre se usa el dominio de producción para que Google no indexe duplicados (www vs. sin www, previews, etc.)
    const url = `${site.url}${path ?? window.location.pathname}`;
    const absoluteOg = ogImage?.startsWith("http") ? ogImage : `${site.url}${ogImage}`;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      if (!content) return;
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // <title>
    document.title = title;

    // Meta básicas
    setMeta("description", description, "name");

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:image", absoluteOg, "property");
    setMeta("og:url", url, "property");
    setMeta("og:site_name", site.name, "property");
    setMeta("og:locale", "es_CO", "property");

    // Twitter Cards
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", absoluteOg, "name");

    // Canonical
    let linkCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", url);

    // Robots
    setMeta(
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1",
      "name"
    );

    // JSON-LD propio de la página (el global del negocio vive en index.html)
    const existing = document.getElementById("page-jsonld");
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = "page-jsonld";
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, ogImage, type, noIndex, path, jsonLd]);

  return null;
}
