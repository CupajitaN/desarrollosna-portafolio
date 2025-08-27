import { useEffect } from "react";

type SeoProps = {
  title?: string;
  description?: string;
  ogImage?: string; // puede ser /preview.png o URL absoluta
  type?: "website" | "article";
  noIndex?: boolean;
  canonical?: string; // opcional, por defecto location.href
};

export function Seo({
  title = "Desarrollos NA | Portafolio",
  description = "Soluciones digitales modernas: sitios web, aplicaciones y sistemas escalables hechos a medida.",
  ogImage = "/preview.png",
  type = "website",
  noIndex = false,
  canonical,
}: SeoProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const url = canonical || window.location.href;
    const absoluteOg = ogImage?.startsWith("http") ? ogImage : `${origin}${ogImage}`;

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

    // Robots (noindex)
    let robotsEl = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noIndex) {
      if (!robotsEl) {
        robotsEl = document.createElement("meta");
        robotsEl.setAttribute("name", "robots");
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute("content", "noindex, nofollow");
    } else if (robotsEl) {
      robotsEl.remove();
    }
  }, [title, description, ogImage, type, noIndex, canonical]);

  return null;
}
