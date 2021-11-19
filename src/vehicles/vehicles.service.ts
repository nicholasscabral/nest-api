import { Injectable } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { VehiclesRepository } from "./vehicles.repository";

@Injectable()
export class VehiclesService {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  create(createVehicleDto: CreateVehicleDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateVehicleDto: UpdateVehicleDto) {}

  remove(id: number) {}
}
