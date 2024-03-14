import { NextFunction, Request, Response } from "express";
import serverService from "../service/server.service";
import statusHandler from "../utils/status.handler";
import { ServerData } from "../types/server.type";
import { CreateError } from "../utils/errorMessage.handler";
import { validateRequiredFields } from "../utils/helper.validateFields";

export default function serverController() {
  return {
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { serverName }: ServerData = req.body;
        if (!serverName) {
          throw new Error("Fields must be provided");
        }
        const result = await serverService.createServer({
          serverName,
          ramSize: "1024",
          serverURL: "https://testserver.io",
        });
        if (!result) {
          res.status(statusHandler.conflict.code).json({
            success: false,
            message: "Error Occured While creating Server",
            error: result,
            status: statusHandler.conflict.code,
          });
        }
        res.status(statusHandler.ok.code).json({
          success: true,
          status: statusHandler.ok.code,
          message: "Server Created successfuly!",
          server: result,
        });
      } catch (error) {
        next(error);
      }
    },
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
  };
}
