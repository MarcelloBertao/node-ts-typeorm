import { Request, Response } from "express";
import { collaboratorRepository } from "../repositories/collaboratorRepository";

export class CollaboratorController{
  async create(req: Request, res: Response){
    const{cpf, nome, email} = req.body;

    if(!cpf) return res.status(400).json({ message: "CPF obrigatório!"})
    if(!nome) return res.status(400).json({ message: "Nome obrigatório!"})
    if(!email) return res.status(400).json({ message: "Email obrigatório!"})

    try{
      const newCollaborator = collaboratorRepository.create({
        cpf,
        nome,
        email
      })

      await collaboratorRepository.save(newCollaborator)
      return res.status(201).json({ message: "Collaborator created successfully!", newCollaborator})
    }catch(error){
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error!"})
    }
  }
}