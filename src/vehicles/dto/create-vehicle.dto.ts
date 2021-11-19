import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";

export class CreateVehicleDto {
  @ApiProperty()
  plate: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  user_id: string;
}
