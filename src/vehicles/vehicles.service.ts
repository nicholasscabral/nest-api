import { Injectable } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Injectable()
export class VehiclesService {
  create(createVehicleDto: CreateVehicleDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateVehicleDto: UpdateVehicleDto) {}

  remove(id: number) {}
}
