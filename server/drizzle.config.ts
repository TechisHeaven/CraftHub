import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schemas/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    database: "craft_hub",
    host: "localhost",
    user: "root",
    password: "",
  },
} satisfies Config;
