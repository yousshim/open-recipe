import { createConnection } from "typeorm";
import { User } from "./entity/user";
import { DEV } from "../constants";

export async function createDbConnecton() {
  return await createConnection({
    type: "postgres",
    host: process.env["BD_HOST"] ?? "localhost",
    port: parseInt(process.env["DB_PORT"] ?? "5432"),
    username: process.env["DB_USERNAME"] ?? "postgres",
    password: process.env["DB_PASSWORD"] ?? "passwd",
    database: process.env["DB_NAME"] ?? "open-recipe",
    entities: [User],
    synchronize: DEV,
    logging: DEV,
    dropSchema: DEV,
  });
}
