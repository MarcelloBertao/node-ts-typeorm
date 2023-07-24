import { Request, Response } from "express";
import { lendingRepository } from "../repositories/lendingRepository";

export class LendingController{
  async create(req: Request, res: Response){
    const {dateEvent, dateReturn} = req.body
    const {student_id, collaborator_id} = req.params

    
    if(!dateEvent) return res.status(400).json({"message": "Data do Empréstimo necessaria!"})
    if(!dateReturn) return res.status(400).json({"message": "Data para Devolução necessaria!"})

    try {
      const newLending = lendingRepository.create({
          dateEvent, 
          dateReturn
        })
        await lendingRepository.save(newLending)
        return res.status(201).json({"message": "Lending created successfully!", newLending})  
    } catch (error) {
      console.log(error)
      return res.status(500).json({"message": "Internal Server Error!"})
    }
  }
}