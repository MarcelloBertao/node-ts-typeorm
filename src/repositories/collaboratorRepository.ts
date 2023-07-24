import { AppDataSource } from "../data-source";
import { Collaborator } from "../entities/Collaborator";

export const collaboratorRepository = AppDataSource.getRepository(Collaborator);