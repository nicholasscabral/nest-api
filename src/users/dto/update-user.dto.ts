import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: false })
  email?: string;
}
