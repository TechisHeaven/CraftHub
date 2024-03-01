import {
  mysqlTable,
  text,
  serial,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: serial("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
