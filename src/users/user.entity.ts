import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "src/vehicles/vehicle.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty()
  @CreateDateColumn({ default: () => "now()" })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @OneToMany((type) => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
}
