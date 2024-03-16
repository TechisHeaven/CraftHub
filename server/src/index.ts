import express from "express";
import dotenv from "dotenv";
import { db } from "./db/connection";
import { user } from "./db/schemas/schema";
import errorHandler from "./utils/error.handler";
import uuid4 from "uuid4";
import cors from "cors";
const authRoutes = require("./routes/auth.routes");
const serverRoutes = require("./routes/server.routes");
dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/server", serverRoutes);

app.use(errorHandler);

//docker run command : docker run -d -p 25565:25565 minecraft-server

// app.get("*", function (req, res) {
//   return res.status(404).json({
//     status: 404,
//     message: "Route not found",
//   });
// });

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!! test 2nd time");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
