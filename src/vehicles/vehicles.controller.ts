import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {}

  @Get()
  findAll() {}

  @Get(":id")
  findOne(@Param("id") id: string) {}

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVehicleDto: UpdateVehicleDto) {}

  @Delete(":id")
  remove(@Param("id") id: string) {}
}
