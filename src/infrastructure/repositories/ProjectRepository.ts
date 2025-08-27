import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";
import type { Project } from "../../domain/models/Project";
import type { HttpClient } from "../http/HttpClient";

export class ProjectRepository implements IProjectRepository {
  constructor(private http: HttpClient) {}

  async list(): Promise<Project[]> {
    return this.http.get<Project[]>("/projects.json");
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const all = await this.list();
    return all.find(p => p.slug === slug) ?? null;
  }
}
