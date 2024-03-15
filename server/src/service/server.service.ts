import uuid4 from "uuid4";
import { db } from "../db/connection";
import { minecraftServer } from "../db/schemas/schema";
import { ServerData } from "../types/server.type";
import { eq } from "drizzle-orm";

const serverService = {
  async createServer(data: ServerData) {
    const serverID = uuid4();
    const adminUserID = uuid4();
    const containerID = uuid4();

    //check duplicate server url
    const checkDuplicateURL = await db
      .select()
      .from(minecraftServer)
      .where(eq(minecraftServer.serverURL, data.serverURL));

    if (checkDuplicateURL[0]) {
      throw new Error("Duplicate server URL");
    }
    const result = await db.insert(minecraftServer).values({
      serverID: serverID,
      adminUserID: adminUserID,
      containerID: containerID,
      serverName: data.serverName,
      serverURL: data.serverURL || "http://testurl.io",
      ramSize: data.ramSize || "1024",
      createdAt: new Date(),
    });

    if (result[0]) {
      const server = await db
        .select()
        .from(minecraftServer)
        .where(eq(minecraftServer.serverID, serverID));
      return server[0];
    }
  },
  async fetchServerByID(id: string) {
    const result = await db
      .select()
      .from(minecraftServer)
      .where(eq(minecraftServer.serverID, id));
    return result[0];
  },
  async fetchServersByUserID(id: string) {
    const result = await db
      .select()
      .from(minecraftServer)
      .where(eq(minecraftServer.adminUserID, id));
    return result;
  },
  async UpdateServer(id: string, data: ServerData) {
    const result = await db
      .update(minecraftServer)
      .set({
        serverID: data.serverID,
        adminUserID: data.adminUserID,
        containerID: data.containerID,
        serverName: data.serverName,
        serverURL: data.serverURL || "http://testurl.io",
        ramSize: data.ramSize || "1024",
        createdAt: new Date(),
      })
      .where(eq(minecraftServer.serverID, id));
    if (result) {
      const server = await db
        .select()
        .from(minecraftServer)
        .where(eq(minecraftServer.serverID, id));
      return server[0];
    }
  },
  async DeleteServer(id: string) {
    const result = await db
      .delete(minecraftServer)
      .where(eq(minecraftServer.serverID, id));

    return result[0];
  },
  async startServerContainer(id: string) {
    const result = await db
      .update(minecraftServer)
      .set({ ServerisActive: true })
      .where(eq(minecraftServer.containerID, id));

    return result;
  },
  async StopServerContainer(id: string) {
    const result = await db
      .update(minecraftServer)
      .set({ ServerisActive: false })
      .where(eq(minecraftServer.containerID, id));

    return result;
  },
};

export default serverService;
