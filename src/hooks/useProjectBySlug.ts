import { useEffect, useState } from "react";
import { useServices } from "../providers/DIProvider";
import { Project } from "../domain/models/Project";

export function useProjectBySlug(slug: string) {
  const { getProjectBySlug } = useServices();
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      try { setData(await getProjectBySlug.execute(slug)); }
      catch (e) { setError(e); }
      finally { setLoading(false); }
    })();
  }, [getProjectBySlug, slug]);

  return { data, loading, error };
}
