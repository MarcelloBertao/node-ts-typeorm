import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lending } from "./Lending";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'text' })
  isbn: string

  @Column({ type: 'text' })
  nome: string

  @Column({ type: 'text' })
  autor: string

  @Column({ type: 'int' })
  paginas: number

  @ManyToMany(() => Lending, lending => lending.books)
  @JoinTable({
    name: 'book_lending',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'lending_id',
      referencedColumnName: 'id'
    }
  })
  lendings: Lending[]

  @DeleteDateColumn()
  deletedAt: Date
}