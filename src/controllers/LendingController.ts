import { Request, Response } from "express";
import { lendingRepository } from "../repositories/lendingRepository";
import { studentRepository } from "../repositories/studentRepository";
import { collaboratorRepository } from "../repositories/collaboratorRepository";
import { bookRepository } from "../repositories/bookRepository";
import { In } from "typeorm";

export class LendingController{
  async create(req: Request, res: Response){
    const {dateEvent, dateReturn, idbook, idstudent, idcollaborator} = req.body
    console.log(idbook)

    if(!idbook) return res.status(400).json({"message": "Livro necessario!"})
    if(!idstudent) return res.status(400).json({"message": "Estudante necessario!"})
    if(!idcollaborator) return res.status(400).json({"message": "Colaborador necessario!"})
    if(!dateEvent) return res.status(400).json({"message": "Data do Empréstimo necessaria!"})
    if(!dateReturn) return res.status(400).json({"message": "Data para Devolução necessaria!"})

    try {
      const books = await bookRepository.find({where: { id: In(idbook)}})
      const student = await studentRepository.findOneBy({id: idstudent})
      const collaborator = await collaboratorRepository.findOneBy({id: idcollaborator})

      if(!books || !student || !collaborator){
        return res.status(404).json({"message": "Não encontrado!"})
      }
      
      const newLending = lendingRepository.create({
          dateEvent,
          dateReturn,
          books,
          student,
          collaborator
        })
        await lendingRepository.save(newLending)
        return res.status(201).json({"message": "Lending created successfully!", newLending})  
    } catch (error) {
      console.log(error)
      return res.status(500).json({"message": "Internal Server Error!"})
    }
  }

  async list(req: Request, res: Response){
    try{
      const list = await lendingRepository.find({
        relations: {
          books: true,
          collaborator: true,
          student: true
        }})
        return res.json(list)
    }catch (error) {
    console.log(error)
    return res.status(500).json({"message": "Internal Server Error!"})
    }
  }

  async update(req: Request, res: Response){
    const {dateEvent, dateReturn, idbook, idstudent, idcollaborator} = req.body
    const {idlending} = req.params

    try{
      const lending = await studentRepository.findOneBy({ id: idlending})
      const books = await bookRepository.find({where: { id: In(idbook)}})
      const student = await studentRepository.findOneBy({id: idstudent})
      const collaborator = await collaboratorRepository.findOneBy({id: idcollaborator})

      if(!lending || !books || !student || !collaborator){
        return res.status(404).json({"message": "Não encontrado!"})
      }
      
      await lendingRepository.save({
        id: Number(idlending),
        dateEvent,
        dateReturn,
        books,
        student,
        collaborator
      })
      return res.status(202).json({"message": "Estudante alterado com sucesso!"})
    }catch (error) {
      console.log(error)
      return res.status(500).json({"message": "Internal Server Error!"})
    }
  }
}