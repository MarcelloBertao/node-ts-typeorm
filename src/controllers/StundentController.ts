import { Request, Response } from "express";
import { studentRepository } from "../repositories/studentRepository";

export class StudentController{
  async create(req: Request, res: Response){
    const { ra, name, email, fone } = req.body
    
    if(!ra) return res.status(400).json({ message: "ra obrigatório!"})
    if(!name) return res.status(400).json({ message: "Nome obrigatório!"})
    if(!email) return res.status(400).json({ message: "email obrigatório!"})
    if(!fone) return res.status(400).json({ message: "Num telefone obrigatório!"})

    try{
      const newStudent = studentRepository.create({
        ra,
        name,
        email,
        fone
      })
      
      await studentRepository.save(newStudent)

      return res.status(201).json({message: "Student created sucessfully!",newStudent})
    }catch(error){
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error!"})
    }
  }
}