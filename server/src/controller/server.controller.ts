import { NextFunction, Request, Response } from "express";
import serverService from "../service/server.service";
import statusHandler from "../utils/status.handler";
import { ServerData } from "../types/server.type";
import { CreateError } from "../utils/errorMessage.handler";
import { validateRequiredFields } from "../utils/helper.validateFields";
import minecraftController from "./minecraft.controller";
import { updateServerProperties } from "../utils/update.serverProperties";

export default function serverController() {
  return {
    //create a new server
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { serverName, serverURL, ramSize }: ServerData = req.body;
        if (!serverName && !serverURL) {
          throw new Error("Fields must be provided");
        }
        const result = await serverService.createServer({
          serverName,
          ramSize: "1024",
          serverURL: serverURL,
        });
        if (!result) {
          res.status(statusHandler.conflict.code).json({
            success: false,
            message: "Error Occured While creating Server",
            error: result,
            status: statusHandler.conflict.code,
          });
        }
        if (!result?.containerID) {
          CreateError(
            statusHandler.notFound.code,
            "Container ID does not exist or Something went wrong"
          );
        }
        const containerID = result!.containerID;
        await minecraftController().createMinecraftServer(containerID, "1024");
        res.status(statusHandler.ok.code).json({
          success: true,
          status: 201,
          message: "Server Created successfuly!",
          server: result,
        });
      } catch (error) {
        next(error);
      }
    },
    //start server container by id
    async startContainer(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        if (!id) {
          CreateError(statusHandler.notFound.code, "ID not found");
        }
        await minecraftController()
          .startMinecraftServer(id)
          .then((containerId) => {
            console.log(`Container Started successfully. ID: ${containerId}`);
            // Here you can send the container ID back to your server
          })
          .catch((error) => {
            console.error("Error Starting container:", error);
            CreateError(
              statusHandler.badRequest.code,
              "Error Starting Container" + error
            );
            // Handle error
          });

        const result = await serverService.startServerContainer(id);
        if (!result) {
          CreateError(
            statusHandler.conflict.code,
            "Error Starting Container or server"
          );
        }

        res.status(statusHandler.ok.code).json({
          success: true,
          message: "Server Starting successfuly!",
          result: { ContainerID: id },
        });
      } catch (error) {
        next(error);
      }
    },
    //stop server container by id
    async stopContainer(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        if (!id) {
          CreateError(statusHandler.notFound.code, "ID not found");
        }
        await minecraftController()
          .stopMinecraftServer(id)
          .then((containerId) => {
            console.log(`Container Stopped successfully. ID: ${containerId}`);
            // Here you can send the container ID back to your server
          })
          .catch((error) => {
            console.error("Error Stopping container:", error);
            CreateError(
              statusHandler.conflict.code,
              "Error Stopping Container"
            );
            // Handle error
          });

        const result = await serverService.StopServerContainer(id);
        if (!result) {
          CreateError(
            statusHandler.conflict.code,
            "Error Stopping Container or server"
          );
        }

        res.status(statusHandler.ok.code).json({
          success: true,
          message: "Server Stopped successfuly!",
          result: { ContainerID: id },
        });
      } catch (error) {
        next(error);
      }
    },
    //update server container by id
    async updateContainerProperties(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const { containerID, data } = req.body;

        if (!containerID) {
          CreateError(statusHandler.notFound.code, "Container Id is required");
        }
        if (!data || data.length <= 0) {
          CreateError(statusHandler.notFound.code, "Data is required");
        }
        const serverPropertiesFields = [
          // World settings
          "level_seed",
          "level_name",
          "level_type",

          // Game settings
          "gamemode",
          "difficulty",
          "max_players",
          "spawn_monsters",
          "spawn_animals",
          "pvp",

          // Network settings
          "server_port",
          "server_ip",
          "enable_query",
          "query_port",
          "enable_rcon",
          "rcon_port",
          "enable_jmx_monitoring",

          // Other settings
          "online_mode",
          "enable_command_block",
          "enable_status",
          // Add more properties here...
        ];

        if (validateRequiredFields(data, serverPropertiesFields)) {
          CreateError(statusHandler.notFound.code, "All Fields are required");
        }

        await updateServerProperties(data, containerID);
        const result = await minecraftController()
          .updateMinecraftServerProperties(containerID)
          .then((containerId) => {
            console.log(`Container Updated successfully. ID: ${containerId}`);
            // Here you can send the container ID back to your server
          })
          .catch((error) => {
            console.error("Error Updated container:", error);
            CreateError(
              statusHandler.conflict.code,
              "Error Updated Container Properties"
            );
            // Handle error
          });
        res.status(statusHandler.ok.code).json({
          success: true,
          message: "Server Properties Updated successfuly!",
          server: result,
        });
      } catch (error) {
        next(error);
      }
    },
    //fetch server by id
    async fetchServerByID(req: Request, res: Response, next: NextFunction) {
      try {
        const id: string = req.params.id;
        if (!id) {
          CreateError(statusHandler.notFound.code, "ID must be required");
        }

        const result = await serverService.fetchServerByID(id);

        if (!result) {
          CreateError(statusHandler.badRequest.code, "Failed to fetch server");
        }
        res.status(statusHandler.ok.code).json({
          success: true,
          status: statusHandler.ok.code,
          message: "Server Fetched successfuly!",
          server: result,
        });
      } catch (error) {
        next(error);
      }
    },
    //fetch all servers by user id
    async fetchServersByUserID(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const id: string = req.params.id;
        if (!id) {
          CreateError(statusHandler.notFound.code, "ID must be required");
        }

        const result = await serverService.fetchServersByUserID(id);

        if (!result || result.length <= 0) {
          CreateError(statusHandler.badRequest.code, "Failed to fetch servers");
        }
        res.status(statusHandler.ok.code).json({
          success: true,
          status: statusHandler.ok.code,
          message: "Servers Fetched successfuly!",
          server: result,
        });
      } catch (error) {
        next(error);
      }
    },
    //update server information
    async UpdateServer(req: Request, res: Response, next: NextFunction) {
      try {
        const id: string = req.params.id;
        const data: ServerData = req.body;
        const fields = [
          "serverID",
          "adminUserID",
          "containerID",
          "serverName",
          "serverURL",
          "ramSize",
        ];

        if (!validateRequiredFields(data, fields)) {
          CreateError(statusHandler.notFound.code, "Fields must be required");
        }
        if (!id) {
          CreateError(statusHandler.notFound.code, "ID must be required");
        }

        const result = await serverService.UpdateServer(id, data);

        if (!result) {
          CreateError(
            statusHandler.badRequest.code,
            "Failed to Update servers"
          );
        }
        res.status(statusHandler.ok.code).json({
          success: true,
          status: statusHandler.ok.code,
          message: "Servers Updated successfuly!",
          server: result,
        });
      } catch (error) {
        next(error);
      }
    },
    //delete server
    async DeleteServer(req: Request, res: Response, next: NextFunction) {
      try {
        const id: string = req.params.id;

        if (!id) {
          CreateError(statusHandler.notFound.code, "ID must be required");
        }

        const result = await serverService.DeleteServer(id);
        if (result.affectedRows <= 0 || !result) {
          CreateError(statusHandler.badRequest.code, "Failed to Delete server");
        }
        res.status(statusHandler.ok.code).json({
          success: true,
          status: statusHandler.ok.code,
          message: "Servers Deleted successfuly!",
        });
      } catch (error) {
        next(error);
      }
    },
  };
}
