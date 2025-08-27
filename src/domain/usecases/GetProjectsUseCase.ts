import type { IProjectRepository } from "../repositories/IProjectRepository";
import type { Project } from "../models/Project";

export class GetProjectsUseCase {
  constructor(private repo: IProjectRepository) {}
  async execute(): Promise<Project[]> {
    return this.repo.list();
  }
}
