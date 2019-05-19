import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "../utils/Config";
import { Follows } from "./entity/Follow";
import { Post } from "./entity/Post";

export const connectionPromise = createConnection({
  type: config.get("DB_TYPE"),
  host: config.get("DB_HOST"),
  port: config.get("DB_PORT"),
  username: config.get("DB_USERNAME"),
  password: config.get("DB_PASSWORD"),
  database: config.get("DB_DATABASE"),
  entities: [Follows, Post],
  synchronize: true,
  logging: false,
});
