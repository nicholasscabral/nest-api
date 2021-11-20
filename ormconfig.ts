import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  entities: ["dist/src/**/*.entity.js"],
  migrations: ["dist/src/database/migrations/*.js"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};

export default config;
