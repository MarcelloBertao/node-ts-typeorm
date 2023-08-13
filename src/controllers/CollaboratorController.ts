import { Request, Response } from "express";
import { collaboratorRepository } from "../repositories/collaboratorRepository";

export class CollaboratorController {
  async create(req: Request, res: Response) {
    const { cpf, nome, email } = req.body;

    if (!cpf) return res.status(400).json({ message: "CPF obrigatório!" })
    if (!nome) return res.status(400).json({ message: "Nome obrigatório!" })
    if (!email) return res.status(400).json({ message: "Email obrigatório!" })

    try {
      const newCollaborator = collaboratorRepository.create({
        cpf,
        nome,
        email
      })

      await collaboratorRepository.save(newCollaborator)
      return res.status(201).json({ message: "Collaborator created successfully!", newCollaborator })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error!" })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const list = await collaboratorRepository.find()
      return res.json(list)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal Server Error!" })
    }
  }

  async listDeleted(req: Request, res: Response) {
    try {
      const list = await collaboratorRepository.find({ withDeleted: true })
      return res.json(list)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal Server Error!" })
    }
  }

  async update(req: Request, res: Response) {
    const { cpf, nome, email } = req.body;
    const { idcollaborator } = req.params

    try {
      const collaborator = await collaboratorRepository.findOneBy({ id: idcollaborator })
      if (!collaborator) return res.status(404).json({ "message": "Livro não encontrado!" })
      await collaboratorRepository.update(idcollaborator, {
        cpf,
        nome,
        email
      })
      return res.status(202).json({ "message": "Colaborador alterado com sucesso!" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal Server Error!" })
    }
  }

  async delete(req: Request, res: Response) {
    const { idcollaborator } = req.params
    if (!idcollaborator) return res.status(400).json({ "message": "Colaborador necessário!" })

    try {
      await collaboratorRepository
        .createQueryBuilder('collaborators')
        .softDelete()
        .where("id = :id", { id: idcollaborator })
        .execute()

      return res.status(202).json({ "message": "Colaborador deletado com sucesso!" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal Server Error!" })
    }
  }

  async restore(req: Request, res: Response) {
    const { idcollaborator } = req.params
    if (!idcollaborator) return res.status(400).json({ "message": "Colaborador necessário!" })

    try {
      await collaboratorRepository
        .createQueryBuilder('collaborators')
        .restore()
        .where("id = :id", { id: idcollaborator })
        .execute()

      return res.status(202).json({ "message": "Colaborador restaurado com sucesso!" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal Server Error!" })
    }
  }
}