import { Injectable } from "@nestjs/common";
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

      if (!credentialsInUse) {
        return { error: true, message: "Credentials in use" };
      }

      return { error: false };
    } catch (err) {}
  }
}
