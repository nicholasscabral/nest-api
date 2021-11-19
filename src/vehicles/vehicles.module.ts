import { forwardRef, Module } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { VehiclesController } from "./vehicles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehiclesRepository } from "./vehicles.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([VehiclesRepository]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
