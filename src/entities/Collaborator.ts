import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Lending } from "./Lending"

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: "text" })
  cpf: string

  @Column({ type: 'text' })
  nome: string

  @Column({ type: 'text' })
  email: string

  @OneToMany(() => Lending, (lending) => lending.collaborator)
  lendings: Lending[]

  @DeleteDateColumn()
  deletedAt: Date
}