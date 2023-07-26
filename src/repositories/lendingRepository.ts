import { AppDataSource } from "../data-source";
import { Lending } from "../entities/Lending";

export const lendingRepository = AppDataSource.getRepository(Lending)