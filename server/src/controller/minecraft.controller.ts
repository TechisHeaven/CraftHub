import { exec } from "node:child_process";

export default function minecraftController() {
  return {
    async startMinecraftServer(serverName: string, ramSize: string) {
      // Execute the start.sh script
      //   exec("start.sh", (error: any, stdout: any, stderr: any) => {
      //     if (error) {
      //       console.error(`Error starting Minecraft server: ${error.message}`);
      //       return;
      //     }
      //     if (stderr) {
      //       console.error(`Error starting Minecraft server: ${stderr}`);
      //       return;
      //     }
      //     console.log(`Minecraft server started successfully: ${stdout}`);
      //   });
      return new Promise((resolve, reject) => {
        const PORT_NUMBER = 25565;
        const ExectureCommand = `start.sh ${ramSize} ${serverName} ${PORT_NUMBER}`;
        exec(ExectureCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error starting Minecraft server: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Error starting Minecraft server: ${stderr}`);
            reject(stderr);
            return;
          }

          exec(
            "docker ps --format '{{.ID}}' --filter name=" + serverName,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error getting container ID: ${error.message}`);
                reject(error);
                return;
              }
              if (stderr) {
                console.error(`Error getting container ID: ${stderr}`);
                reject(stderr);
                return;
              }
              const containerId = stdout.trim();
              resolve(containerId);
            }
          );
        });
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
  };
}
