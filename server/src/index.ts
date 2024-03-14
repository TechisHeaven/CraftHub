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

//docker run command : docker run -d -p 25565:25565 minecraft-server
app.get("/server", (req, res) => {
  const { exec } = require("child_process");

  // Function to start the Minecraft server using start.sh script
  function startMinecraftServer() {
    // Execute the start.sh script
    exec("start.sh", (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error starting Minecraft server: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error starting Minecraft server: ${stderr}`);
        return;
      }
      console.log(`Minecraft server started successfully: ${stdout}`);
    });
  }

  // Call the function to start the Minecraft server
  startMinecraftServer();
});

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
