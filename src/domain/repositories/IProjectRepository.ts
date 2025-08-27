import { Project } from "../models/Project";

export interface IProjectRepository {
  list(): Promise<Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
}
