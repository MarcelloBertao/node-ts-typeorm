import { Student } from './Student';
import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import { Collaborator } from './Collaborator';

@Entity('lendings')
export class Lending{
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  dateEvent: string

  @Column({type: 'text'})
  dateReturn: string

  @ManyToOne(() => Student, student => student.lendings)
  @JoinColumn({name: 'student_ra'})
  student: Student

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.lendings)
  @JoinColumn({name: 'collaborator_cpf'})
  collaborator: Collaborator
}