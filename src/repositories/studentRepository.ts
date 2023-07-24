import { AppDataSource } from "../data-source";
import { Student } from "../entities/Student";

export const studentRepository = AppDataSource.getRepository(Student)