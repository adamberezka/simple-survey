import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionAnswer extends BaseEntity {
  
  constructor(questionId: number, possibleAnswerId: number, content: string, userId: number, surveyAnswerId: number) {
    super();
    this.questionId = questionId;
    this.possibleAnswerId = possibleAnswerId;
    this.content = content;
    this.userId = userId;
    this.surveyAnswerId = surveyAnswerId;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  questionId: number

  @Column()
  possibleAnswerId: number

  @Column()
  content: string;

  @Column()
  userId: number

  @Column()
  surveyAnswerId: number

}