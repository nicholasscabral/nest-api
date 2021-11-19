import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  plate: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  model: string;

  @Column()
  location: string;

  @CreateDateColumn({ default: () => "now()" })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
