import fs from "fs";
import { MinecraftServerProperties } from "../types/server.type";
import path from "path";

export function updateServerProperties(
  data: MinecraftServerProperties,
  containerID: string
) {
  try {
    const parentFolderPath = path.resolve(
      __dirname,
      "..",
      "minecraft-configuration",
      containerID
    );
    const filePath = path.join(parentFolderPath, "server.properties"); // Path to server.properties file
    let fileContent = "";

    const propertiesToUpdate = {
      // World settings
      level_seed: data.level_seed || "", // Seed for the world generation
      level_name: data.level_name || "world", // Name of the world directory
      level_type: data.level_type || "default", // Type of world (e.g., default, flat, amplified)

      // Game settings
      gamemode: data.gamemode || "survival", // Default game mode (e.g., survival, creative, adventure)
      difficulty: data.difficulty || "easy", // Difficulty level (e.g., peaceful, easy, normal, hard)
      max_players: data.max_players || 20, // Maximum number of players allowed on the server
      spawn_monsters: data.spawn_monsters || true, // Whether monsters can spawn
      spawn_animals: data.spawn_animals || true, // Whether animals can spawn
      pvp: data.pvp || true, // Whether player vs. player combat is allowed

      // Network settings
      server_port: data.server_port || 25565, // Port for server connection
      server_ip: data.server_ip || "", // IP address for server (leave blank for all interfaces)
      enable_query: data.enable_query || false, // Whether to enable query protocol
      query_port: data.query_port || 25565, // Port for query protocol
      enable_rcon: data.enable_rcon || false, // Whether to enable remote console (RCON)
      rcon_port: data.rcon_port || 25575, // Port for RCON
      enable_jmx_monitoring: data.enable_jmx_monitoring || false, // Whether to enable JMX monitoring

      // Other settings
      online_mode: data.online_mode || true, // Whether to verify usernames with Mojang servers
      enable_command_block: data.enable_command_block || false, // Whether to enable command blocks
      enable_status: data.enable_status || true, // Whether to enable server status response
      // Add more properties here...
    };

    // Ensure the parent folder exists, creating it if necessary
    if (!fs.existsSync(parentFolderPath)) {
      fs.mkdirSync(parentFolderPath, { recursive: true });
    }

    // Check if the server.properties file already exists
    if (fs.existsSync(filePath)) {
      fileContent = fs.readFileSync(filePath, "utf8");
    } else {
      // If the file doesn't exist, create an empty file
      fs.writeFileSync(filePath, fileContent, "utf8");
    }

    // Iterate over the properties to update
    Object.entries(propertiesToUpdate).forEach(([property, value]) => {
      const pattern = new RegExp(`${property}=.*`);
      const match = fileContent.match(pattern); // Check if the property exists in the file
      if (match) {
        fileContent = fileContent.replace(pattern, `${property}=${value}`);
      } else {
        fileContent += `${property}=${value}\n`;
      }
    });

    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log("Server properties updated successfully");
  } catch (error) {
    console.error(`Error updating server properties: ${error}`);
  }
}

export const defaultProperties = {
  // World settings
  level_seed: "", // Seed for the world generation
  level_name: "world", // Name of the world directory
  level_type: "default", // Type of world (e.g., default, flat, amplified)

  // Game settings
  gamemode: "survival", // Default game mode (e.g., survival, creative, adventure)
  difficulty: "easy", // Difficulty level (e.g., peaceful, easy, normal, hard)
  max_players: 20, // Maximum number of players allowed on the server
  spawn_monsters: true, // Whether monsters can spawn
  spawn_animals: true, // Whether animals can spawn
  pvp: true, // Whether player vs. player combat is allowed

  // Network settings
  server_port: 25565, // Port for server connection
  server_ip: "", // IP address for server (leave blank for all interfaces)
  enable_query: false, // Whether to enable query protocol
  query_port: 25565, // Port for query protocol
  enable_rcon: false, // Whether to enable remote console (RCON)
  rcon_port: 25575, // Port for RCON
  enable_jmx_monitoring: false, // Whether to enable JMX monitoring

  // Other settings
  online_mode: true, // Whether to verify usernames with Mojang servers
  enable_command_block: false, // Whether to enable command blocks
  enable_status: true, // Whether to enable server status response
  // Add more properties here...
};
