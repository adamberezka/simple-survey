import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Survey extends BaseEntity {

  constructor(ownerId: number, title: string, desc: string, active: boolean) {
    super();
    this.ownerId = ownerId;
    this.title = title;
    this.description = desc;
    this.active = active;
  }
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ownerId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @CreateDateColumn({ default: new Date(Date.now() + 12096e5) })
  closeDate!: Date;

}