import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "../utils/Config";
import { Follows } from "./entity/Follow";

export const connectionPromise = createConnection({
  type: config.get("DB_TYPE"),
  host: config.get("DB_HOST"),
  port: config.get("DB_PORT"),
  username: config.get("DB_USERNAME"),
  password: config.get("DB_PASSWORD"),
  database: config.get("DB_DATABASE"),
  entities: [Follows],
  synchronize: true,
  logging: false,
});
