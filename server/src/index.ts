import express from "express";
import dotenv from "dotenv";
import { db } from "./db/connection";
import { user } from "./db/schemas/schema";
import errorHandler from "./utils/error.handler";
import uuid4 from "uuid4";
const authRoutes = require("./routes/auth.routes");
const serverRoutes = require("./routes/server.routes");
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/server", serverRoutes);

app.use(errorHandler);
// app.get("/users", async (req, res) => {
//   const users = await db.select().from(user);
//   res.json(users);
// });

app.get("/create/user", async (req, res) => {
  const userID = uuid4();
  const result = await db.insert(user).values({
    userID,
    name: "John",
    email: "john@example.com",
    password: "123",
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
