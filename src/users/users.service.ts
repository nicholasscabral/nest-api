import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const { username, email, password } = data;

    try {
      const credentialsInUse = await this.usersRepository.verifyCredentials(
        username,
        email
      );

      if (credentialsInUse) {
        return { err: true, message: "Credentials in use" };
      }

      const hash = await bcrypt.hash(password, 8);

      const user = this.usersRepository.create({
        username,
        email,
        password: hash,
      });

      const savedUser = await this.usersRepository.save(user);

      return { err: false, user: savedUser };
    } catch (err) {
      console.log("UsersService.create =>> " + err.message);
      return { err: true, message: err.message };
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (err) {
      console.log("UsersService.findAll =>> " + err.message);
    }
  }

  async find(id: string): Promise<User> {
    try {
      return this.usersRepository.findOne(id);
    } catch (err) {
      console.log("UsersService.find =>> " + err.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (err) {
      console.log("UsersService.delete =>> " + err.message);
    }
  }
}
