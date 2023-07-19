import { Router } from "express";
import { BookController } from "./controllers/BooksController";

const routes = Router();

routes.post('/book', new BookController().create)

export default routes