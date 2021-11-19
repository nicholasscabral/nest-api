import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import dbconfig from "../ormconfig";

import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { VehiclesModule } from "./vehicles/vehicles.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbconfig),
    UsersModule,
    AuthModule,
    VehiclesModule,
  ],
})
export class AppModule {}
