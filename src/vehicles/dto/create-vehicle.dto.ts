import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";

export class CreateVehicleDto {
  @ApiProperty()
  plate: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  user_id: string;
}
