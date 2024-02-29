import express from "express";
import dotenv from "dotenv";
import { db } from "./db/connection";
import { user } from "./db/schemas/schema";

dotenv.config({ path: "./config.env" });
const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await db.select().from(user);
  res.json(users);
});

app.get("/create/user", async (req, res) => {
  const result = await db.insert(user).values({
    name: "John",
    email: "john@example.com",
    password: "22",
    createdAt: new Date(),
  });
  res.json({ message: "Created successfully Bro :)" });
});

// app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!! test 2nd time");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
