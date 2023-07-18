import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Book{
  @PrimaryGeneratedColumn()
  id: string

  @Column({type: 'text'})
  isbn: string

  @Column({type: 'text'})
  autor: string

  @Column({type: 'int'})
  paginas: number
}