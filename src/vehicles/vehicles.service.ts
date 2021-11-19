import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { VehiclesRepository } from "./vehicles.repository";

@Injectable()
export class VehiclesService {
  constructor(
    private vehiclesRepository: VehiclesRepository,
    private usersService: UsersService
  ) {}

  async create(data: CreateVehicleDto) {
    const user = await this.usersService.find(data.user_id);

    const vehicle = this.vehiclesRepository.create({ user, ...data });
    await this.vehiclesRepository.save(vehicle);

    return await this.vehiclesRepository.findOne(vehicle.id, {
      relations: ["user"],
    });
  }

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateVehicleDto: UpdateVehicleDto) {}

  remove(id: number) {}
}
