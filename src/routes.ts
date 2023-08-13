import { Router } from "express";
import { BookController } from "./controllers/BookController";
import { CollaboratorController } from "./controllers/CollaboratorController";
import { LendingController } from "./controllers/LendingController";
import { StudentController } from "./controllers/StudentController";

const routes = Router();

//book's routes
routes.post('/book', new BookController().create)
routes.get('/book', new BookController().list)
routes.post('/book/:idbook/edit', new BookController().update)
routes.post('/book/:idbook/delete', new BookController().delete)
routes.get('/book/deleted', new BookController().listDeleted)
routes.post('/book/:idbook/restore', new BookController().restore)

//collaborator's routes
routes.post('/collaborator', new CollaboratorController().create)
routes.get('/collaborator', new CollaboratorController().list)
routes.post('/collaborator/:idcollaborator/edit', new CollaboratorController().update)
routes.post('/collaborator/:idcollaborator/delete', new CollaboratorController().delete)
routes.get('/collaborator/deleted', new CollaboratorController().listDeleted)
routes.post('/collaborator/:idcollaborator/restore', new CollaboratorController().restore)

//Student's routes
routes.post('/student', new StudentController().create)
routes.get('/student', new StudentController().list)
routes.post('/student/:idstudent/edit', new StudentController().update)
routes.post('/student/:idstudent/delete', new StudentController().delete)
routes.get('/student/deleted', new StudentController().listDeleted)
routes.post('/student/:idstudent/restore', new StudentController().restore)

//Lending's routes
routes.post('/lending', new LendingController().create)
routes.get('/lending', new LendingController().list)
routes.post('/lending/:idlending/edit', new LendingController().update)
routes.post('/lending/:idlending/delete', new LendingController().delete)
routes.post('/lending/:idlending/restore', new LendingController().restore)

export default routes