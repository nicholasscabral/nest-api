import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validate(username: string, password: string) {
    const user = await this.usersService.findToLogin(username);
    console.log(user);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (user && passwordMatches) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
