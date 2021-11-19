import { ApiProperty } from "@nestjs/swagger";

export class UpdateVehicleDto extends Object {
  @ApiProperty({ required: false })
  plate?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  color?: string;

  @ApiProperty({ required: false })
  location?: string;
}
