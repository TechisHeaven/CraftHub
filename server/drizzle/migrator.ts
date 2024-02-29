import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql2 from "mysql2/promise";
import path from "path";

const doMigrate = async () => {
  try {
    console.log("Migrating...");
    const dbConnection = await mysql2.createConnection({
      uri: "mysql://root@localhost:3306/craft_hub",
    });
    const dbMigrator = await drizzle(dbConnection);
    await migrate(dbMigrator, {
      migrationsFolder: "./drizzle",
    });
    console.log("migration done!");
    process.exit(0);
  } catch (error) {
    console.log("migration error: " + error);
    process.exit(0);
  }
};

doMigrate();
