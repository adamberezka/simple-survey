import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PossibleAnswer extends BaseEntity {

  constructor(questionId: number, content: string) {
    super();
    this.questionId = questionId;
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  questionId: number;

  @Column()
  content: string
}