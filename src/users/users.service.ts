import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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

  async findToLogin(username: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select("id, username, password")
      .where({ username })
      .getRawOne();

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (data.username && data.username === user.username) {
      return {
        err: true,
        message: `your username is ${data.username} already`,
      };
    }

    if (data.email && data.email === user.email) {
      return { err: true, message: `your email is ${data.email} already` };
    }

    const usernameInUse = await this.usersRepository.findOne({
      username: data.username,
    });

    if (data.username && usernameInUse) {
      return { err: true, message: "this username is already in use " };
    }

    const emailInUse = await this.usersRepository.findOne({
      email: data.email,
    });

    if (data.email && emailInUse) {
      return { err: true, message: "this email is already in use " };
    }

    const updatedUser = await this.usersRepository.update(id, data);

    return { err: false, updatedUser };
  }

  async delete(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (err) {
      console.log("UsersService.delete =>> " + err.message);
    }
  }
}
