import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("vehicles")
export class Vehicle {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  plate: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @Column()
  model: string;

  @ApiProperty()
  @Column()
  location: string;

  @ApiProperty()
  @CreateDateColumn({ default: () => "now()" })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.vehicles, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: string;
}
