import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Vehicle } from "./vehicle.entity";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() data: CreateVehicleDto
  ): Promise<Vehicle> {
    const { plate, description, color, model, location } = data;

    if (!plate || !color || !model || !location) {
      throw new BadRequestException("Fields are missing");
    }

    data.user_id = req.user.id;

    const response = await this.vehiclesService.create(data);

    if (response.err) {
      throw new BadRequestException(response.message);
    }

    return response.vehicle;
  }

  @Get()
  async index(): Promise<Vehicle[]> {
    const vehicles = await this.vehiclesService.findAll();

    return vehicles;
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.find(id);

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    return vehicle;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVehicleDto: UpdateVehicleDto) {}

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async destroy(@Request() req, @Param("id") id: string) {
    const vehicle = await this.vehiclesService.find(id);

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    console.log(req.user.id, vehicle.user.id);

    if (req.user.id !== vehicle.user.id) {
      throw new ForbiddenException("you can only delete your vehicles");
    }

    await this.vehiclesService.delete(id);
  }
}
