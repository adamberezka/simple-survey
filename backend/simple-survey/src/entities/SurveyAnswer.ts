import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SurveyAnswer extends BaseEntity {
  
  constructor(surveyId: number, userId: number) {
    super();
    this.surveyId = surveyId;
    this.userId = userId;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  surveyId: number;

  @Column()
  userId: number;

}