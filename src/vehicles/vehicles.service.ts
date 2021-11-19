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
    try {
      const plateAlreadyInUse = await this.vehiclesRepository.findOne({
        plate: data.plate,
      });

      if (plateAlreadyInUse) {
        return {
          err: true,
          message: "Already exists a vehicle with this plate",
        };
      }

      const user = await this.usersService.find(data.user_id);

      const vehicle = this.vehiclesRepository.create({ user, ...data });
      const savedVehicle = await this.vehiclesRepository.save(vehicle);

      return { err: false, vehicle: savedVehicle };
    } catch (err) {
      console.log("VehiclesService.create =>> " + err.message);
      return { err: true, message: err.message };
    }
  }

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateVehicleDto: UpdateVehicleDto) {}

  remove(id: number) {}
}
