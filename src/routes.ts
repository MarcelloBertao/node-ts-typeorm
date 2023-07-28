import { Router } from "express";
import { BookController } from "./controllers/BookController";
import { CollaboratorController } from "./controllers/CollaboratorController";
import { LendingController } from "./controllers/LendingController";
import { StudentController } from "./controllers/StudentController";

const routes = Router();
//create
routes.post('/lending', new LendingController().create)
routes.post('/collaborator', new CollaboratorController().create)
routes.post('/student', new StudentController().create)
routes.post('/book', new BookController().create)
//list
routes.get('/lending', new LendingController().list)
routes.get('/collaborator', new CollaboratorController().list)
routes.get('/student', new StudentController().list)
routes.get('/book', new BookController().list)
//update
routes.post('/lending/:idlending', new LendingController().update)
routes.post('/collaborator/:idcollaborator', new CollaboratorController().update)
routes.post('/student/:idstudent', new StudentController().update)
routes.post('/book/:idbook', new BookController().update)

export default routes