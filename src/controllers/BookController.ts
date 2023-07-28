import { Request, Response } from "express";
import { bookRepository } from "../repositories/bookRepository";
import { Book } from "../entities/Book";

export class BookController{
  async create(req: Request, res: Response){
    const { isbn, nome, autor, paginas } = req.body
    
    if(!isbn) return res.status(400).json({ message: "ISBN obrigatório!"})
    if(!nome) return res.status(400).json({ message: "Nome obrigatório!"})
    if(!autor) return res.status(400).json({ message: "Autor obrigatório!"})
    if(!paginas) return res.status(400).json({ message: "Num paginas obrigatório!"})

    try{
      const newBook = bookRepository.create({
        isbn,
        nome,
        autor,
        paginas
      })
      
      await bookRepository.save(newBook)

      return res.status(201).json({newBook})
    }catch(error){
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error!"})
    }
  }

  async list(req: Request, res: Response){
    try{
      const list = await bookRepository.find()
        return res.json(list)
    }catch (error) {
      console.log(error)
      return res.status(500).json({"message": "Internal Server Error!"})
    }
  }

  async update(req: Request, res: Response){
    const { isbn, nome, autor, paginas } = req.body
    const {idbook} = req.params

    try{
      const book = await bookRepository.findOneBy({ id: idbook})
      if(!book) return res.status(404).json({"message": "Livro não encontrado!"})
      await bookRepository.update(idbook, {
        isbn,
        nome,
        autor,
        paginas
      })
      return res.status(202).json({"message": "Livro alterado com sucesso!"})
    }catch (error) {
      console.log(error)
      return res.status(500).json({"message": "Internal Server Error!"})
    }
  }
}