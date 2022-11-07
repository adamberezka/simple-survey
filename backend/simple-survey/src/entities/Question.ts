import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question extends BaseEntity {
  
  constructor(surveyId: number, content: string) {
    super();
    this.surveyId = surveyId;
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  surveyId: number;

  @Column()
  content: string;
  
}