import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PossibleAnswer extends BaseEntity {

  constructor(content: string) {
    super();
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content: string
}