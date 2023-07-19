import { Request, Response } from "express";
import { bookRepository } from "../repositories/bookRepository";

export class BookController{
  async create(req: Request, res: Response){
    const { isbn, nome, autor, paginas } = req.body
    
    if(!isbn){
      return res.status(400).json({ message: "ISBN obrigatório!"})
    }
    if(!nome){
      return res.status(400).json({ message: "Nome obrigatório!"})
    }
    if(!autor){
      return res.status(400).json({ message: "Autor obrigatório!"})
    }
    if(!paginas){
      return res.status(400).json({ message: "Num paginas obrigatório!"})
    }

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
}