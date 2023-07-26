import { Router } from "express";
import { BookController } from "./controllers/BookController";
import { CollaboratorController } from "./controllers/CollaboratorController";
import { LendingController } from "./controllers/LendingController";
import { StudentController } from "./controllers/StudentController";

const routes = Router();

routes.post('/book', new BookController().create)
routes.post('/collaborator', new CollaboratorController().create)
routes.post('/student', new StudentController().create)
routes.post('/lending', new LendingController().create)
export default routes