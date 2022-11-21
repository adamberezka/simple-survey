import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum QuestionType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  OPEN = "open"
}
@Entity()
export class Question extends BaseEntity {
  
  constructor(surveyId: number, content: string, type: QuestionType = QuestionType.CHECKBOX) {
    super();
    this.surveyId = surveyId;
    this.content = content;
    this.type = type;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  surveyId: number;

  @Column()
  content: string;

  @Column({ type: "enum", enum: QuestionType, default: QuestionType.CHECKBOX })
  type: QuestionType
}