import { Module } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { VehiclesController } from "./vehicles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehiclesRepository } from "./vehicles.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesRepository])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
