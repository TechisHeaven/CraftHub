import {
  mysqlTable,
  text,
  serial,
  timestamp,
  int,
  boolean,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  userID: text("userID").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "user">().default("admin"),
  createdAt: timestamp("created_at"),
});

export const minecraftServer = mysqlTable("servers", {
  serverID: text("serverID").notNull().unique(),
  adminUserID: text("adminUserID").notNull().unique(),
  serverName: text("serverName").notNull(),
  containerID: text("containerID").notNull().unique(),
  serverURL: text("serverURL").notNull().unique(),
  ramSize: text("ramSize").notNull(),
  ServerisActive: boolean("ServerisActive").default(false),
  createdAt: timestamp("created_at"),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
