import { useEffect, useState } from "react";
import { useServices } from "../providers/DIProvider";
import { Project } from "../domain/models/Project";

export function useProjects() {
  const { getProjects } = useServices();
  const [data, setData] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      try { setData(await getProjects.execute()); }
      catch (e) { setError(e); }
      finally { setLoading(false); }
    })();
  }, [getProjects]);

  return { data, loading, error };
}
