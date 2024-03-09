import { NextFunction, Request, Response } from "express";
import serverService from "../service/server.service";
import statusHandler from "../utils/status.handler";
import { ServerData } from "../types/server.type";

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
    async fetch(req: Request, res: Response, next: NextFunction) {},
  };
}
