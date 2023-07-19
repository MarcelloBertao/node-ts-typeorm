import { Student } from './Student';
import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany} from 'typeorm';
import { Collaborator } from './Collaborator';
import { Book } from './Book';

@Entity('lendings')
export class Lending{
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  dateEvent: string

  @Column({type: 'text'})
  dateReturn: string

  @ManyToOne(() => Student, student => student.lendings)
  @JoinColumn({name: 'student_id'})
  student: Student

  @ManyToOne(() => Collaborator, (collaborator) => collaborator.lendings)
  @JoinColumn({name: 'collaborator_id'})
  collaborator: Collaborator

  @ManyToMany(() => Book, book => book.lendings)
  books: Book[] 
}