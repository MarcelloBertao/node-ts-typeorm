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

  async list(req: Request, res: Response){
    try{
      const list = await studentRepository.find()
        return res.json(list)
    }catch (error) {
    console.log(error)
    return res.status(500).json({"message": "Internal Server Error!"})
    }
  }

  async update(req: Request, res: Response){
    const { ra, name, email, fone } = req.body
    const {idstudent} = req.params

    try{
      const student = await studentRepository.findOneBy({ id: idstudent})
      if(!student) return res.status(404).json({"message": "Livro não encontrado!"})
      await studentRepository.update(idstudent, {
        ra,
        name,
        email,
        fone
      })
      return res.status(202).json({"message": "Estudante alterado com sucesso!"})
    }catch (error) {
      console.log(error)
      return res.status(500).json({"message": "Internal Server Error!"})
    }
  }
}