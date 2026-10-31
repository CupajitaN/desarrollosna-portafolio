import { useEffect, useState } from "react";
import { useServices } from "../providers/DIProvider";
import { Project } from "../domain/models/Project";

type State = { slug: string | null; data: Project | null; error: unknown };

export function useProjectBySlug(slug: string) {
  const { getProjectBySlug } = useServices();
  const [state, setState] = useState<State>({ slug: null, data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    getProjectBySlug.execute(slug).then(
      (data) => { if (!cancelled) setState({ slug, data, error: null }); },
      (error) => { if (!cancelled) setState({ slug, data: null, error }); }
    );
    return () => { cancelled = true; };
  }, [getProjectBySlug, slug]);

  // Mientras el resultado guardado sea de otro slug, se considera que está cargando
  const loading = state.slug !== slug;
  return { data: loading ? null : state.data, loading, error: loading ? null : state.error };
}
