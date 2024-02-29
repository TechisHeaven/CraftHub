import mysql from "mysql2/promise";
import { MySqlDatabase, drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "craft_hub",
});
export const db = drizzle(pool);
