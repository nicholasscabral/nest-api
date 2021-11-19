import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle } from "./vehicle.entity";
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

  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.vehiclesRepository.find();
    } catch (err) {
      console.log("VehiclesService.finAll =>> " + err.message);
    }
  }

  async find(id: string) {
    try {
      return await this.vehiclesRepository.findOne(id);
    } catch (err) {
      console.log("VehiclesService.find =>> " + err.message);
    }
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {}

  remove(id: number) {}
}
