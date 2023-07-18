import { Lending } from './Lending';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('students')
export class Student{
  @PrimaryGeneratedColumn()
  id: string

  @Column({type: "text"})
  ra: number

  @Column({type : 'text'})
  name: string

  @Column({type : 'text'})
  email: string

  @Column({type : 'text'})
  fone: string
  
  @OneToMany(() => Lending, (lending) => lending.student)
  lendings: Lending[]
}