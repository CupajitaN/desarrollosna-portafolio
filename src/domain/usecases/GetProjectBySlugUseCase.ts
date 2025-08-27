import type { IProjectRepository } from "../repositories/IProjectRepository";
import type { Project } from "../models/Project";

export class GetProjectBySlugUseCase {
  constructor(private repo: IProjectRepository) {}
  async execute(slug: string): Promise<Project | null> {
    return this.repo.getBySlug(slug);
  }
}
