import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export default function minecraftController() {
  return {
    async createMinecraftServer(serverName: string, ramSize: string) {
      return new Promise((resolve, reject) => {
        // Check if the server is already running
        exec(
          `docker ps --format '{{.ID}}' --filter name=${serverName}`,
          (error, stdout, stderr) => {
            if (error) {
              reject(`Error checking server status: ${error.message}`);
              return;
            }
            if (stderr) {
              reject(`Error checking server status: ${stderr}`);
              return;
            }

            const containerId = stdout.trim();
            if (containerId) {
              reject(
                `Server '${serverName}' is already running with container ID '${containerId}'`
              );
              return;
            }

            // Start the server if it's not already running
            const PORT_NUMBER = 25565;
            const ExectureCommand = `start.sh ${ramSize} ${serverName} ${PORT_NUMBER}`;
            exec(ExectureCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(
                  `Error starting Minecraft server: ${error.message}`
                );
                reject(error);
                return;
              }
              if (stderr) {
                console.error(`Error starting Minecraft server: ${stderr}`);
                reject(stderr);
                return;
              }

              resolve(stdout.trim());
            });
          }
        );
      });
    },
    async startMinecraftServer(serverName: string) {
      return new Promise((resolve, reject) => {
        // Check if the server is already running
        exec(
          `docker ps --format '{{.ID}}' --filter name=${serverName}`,
          (error, stdout, stderr) => {
            if (error) {
              reject(`Error checking server status: ${error.message}`);
              return;
            }
            if (stderr) {
              reject(`Error checking server status: ${stderr}`);
              return;
            }

            const containerId = stdout.trim();
            if (containerId) {
              reject(
                `Server '${serverName}' is already running with container ID '${containerId}'`
              );
              return;
            }

            // Start the server if it's not already running
            const PORT_NUMBER = 25565;
            // const ExectureCommand = `start.sh ${ramSize} ${serverName} ${PORT_NUMBER}`;
            const ExectureCommand = `docker start ${serverName}`;
            exec(ExectureCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(
                  `Error starting Minecraft server: ${error.message}`
                );
                reject(error);
                return;
              }
              if (stderr) {
                console.error(`Error starting Minecraft server: ${stderr}`);
                reject(stderr);
                return;
              }

              resolve(stdout.trim());
            });
          }
        );
      });
    },
    async getContainerLogs(containerID: string) {
      return new Promise((resolve, reject) => {
        const command = `docker logs ${containerID}`;
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error getting logs: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Error getting logs: ${stderr}`);
            reject(stderr);
            return;
          }
          resolve(stdout);
        });
      });
    },
    async stopMinecraftServer(id: string) {
      return new Promise((resolve, reject) => {
        const ExectureCommand = `docker stop ${id}`;
        exec(ExectureCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error stopping Minecraft server: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Error stopping Minecraft server: ${stderr}`);
            reject(stderr);
            return;
          }
          resolve(stdout);
        });
      });
    },
    async updateMinecraftServerProperties(containerID: string) {
      return new Promise((resolve, reject) => {
        // Ensure the local folder exists
        const parentFolderPath = path.resolve(
          __dirname,
          "..",
          "minecraft-configuration",
          containerID,
          "server.properties"
        );

        const containerFilePath = `minecraft-server/server.properties`;
        exec(
          `docker cp ${parentFolderPath} ${containerID}:${containerFilePath}`,
          (error, stdout, stderr) => {
            if (error) {
              reject(
                `Error copying server properties to container: ${error.message}`
              );
              return;
            }
            if (stderr) {
              reject(`Error copying server properties to container: ${stderr}`);

              return;
            }
            resolve(
              `Server properties copied to container successfully ${stdout}`
            );
          }
        );
      });
    },
  };
}
