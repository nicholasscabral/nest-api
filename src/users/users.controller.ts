import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse({ type: User })
  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    const { username, email, password, passwordConfirmation } = data;

    if (!username || !email || !password || !passwordConfirmation) {
      throw new BadRequestException("Fields are missing");
    }

    if (password != passwordConfirmation) {
      throw new BadRequestException("Passwords do not match");
    }

    const response = await this.usersService.create(data);

    if (response.err) {
      throw new BadRequestException(response.message);
    }

    return response.user;
  }

  @Get()
  async index(): Promise<User[]> {
    const users = await this.usersService.findAll();

    return users;
  }

  @ApiResponse({ type: User })
  @Get(":id")
  async show(@Param("id") id: string) {
    const user = await this.usersService.find(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
