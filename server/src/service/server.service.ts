import uuid4 from "uuid4";
import { db } from "../db/connection";
import { minecraftServer } from "../db/schemas/schema";
import { ServerData } from "../types/server.type";

const serverService = {
  async createServer(data: ServerData) {
    const serverID = uuid4();
    const adminUserID = uuid4();
    const containerID = uuid4();
    const result = await db.insert(minecraftServer).values({
      serverID: serverID,
      adminUserID: adminUserID,
      containerID: containerID,
      serverName: data.serverName,
      serverURL: data.serverURL || "http://testurl.io",
      ramSize: data.ramSize || "1024",
      createdAt: new Date(),
    });
    return result;
  },
};

export default serverService;
