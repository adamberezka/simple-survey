import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Entity()
export class User extends BaseEntity {

  constructor(email: string, role: UserRole = UserRole.USER) {
    super();
    this.email = email; 
    this.role = role;
  }

  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number

  @Column()
  email: string

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;
}