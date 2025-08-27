import { createContext, useContext, ReactNode, useMemo } from "react";
import { AxiosHttpClient } from "../infrastructure/http/AxiosHttpClient";
import { ProjectRepository } from "../infrastructure/repositories/ProjectRepository";
import { GetProjectsUseCase } from "../domain/usecases/GetProjectsUseCase";
import { GetProjectBySlugUseCase } from "../domain/usecases/GetProjectBySlugUseCase";

type Services = {
  getProjects: GetProjectsUseCase;
  getProjectBySlug: GetProjectBySlugUseCase;
};

const DIContext = createContext<Services | null>(null);

export function DIProvider({ children }: { children: ReactNode }) {
  const services = useMemo<Services>(() => {
    const http = new AxiosHttpClient();
    const projectRepo = new ProjectRepository(http);
    return {
      getProjects: new GetProjectsUseCase(projectRepo),
      getProjectBySlug: new GetProjectBySlugUseCase(projectRepo),
    };
  }, []);

  return <DIContext.Provider value={services}>{children}</DIContext.Provider>;
}

export function useServices(): Services {
  const ctx = useContext(DIContext);
  if (!ctx) throw new Error("useServices must be used within DIProvider");
  return ctx;
}
