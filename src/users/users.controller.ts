import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const { username, email, password, passwordConfirmation } = data;

    if (!username || !email || !password || !passwordConfirmation) {
      throw new BadRequestException("Fields are missing");
    }

    if (password != passwordConfirmation) {
      throw new BadRequestException("Passwords do not match");
    }

    const response = await this.usersService.create(data);

    if (response.error) {
      throw new BadRequestException(response.message);
    }

    return response;
  }
}
