export interface ServerData {
  serverID?: string;
  adminUserID?: string;
  containerID?: string;
  serverName: string;
  serverURL: string;
  ramSize: string;
  ServerisActive?: string | boolean;
  createdAt?: string;
}

export interface MinecraftServerProperties {
  // World settings
  level_seed?: string; // Seed for the world generation
  level_name?: string; // Name of the world directory
  level_type?: string; // Type of world (e.g., default, flat, amplified)

  // Game settings
  gamemode?: string; // Default game mode (e.g., survival, creative, adventure)
  difficulty?: string; // Difficulty level (e.g., peaceful, easy, normal, hard)
  max_players?: number; // Maximum number of players allowed on the server
  spawn_monsters?: boolean; // Whether monsters can spawn
  spawn_animals?: boolean; // Whether animals can spawn
  pvp?: boolean; // Whether player vs. player combat is allowed

  // Network settings
  server_port?: number; // Port for server connection
  server_ip?: string; // IP address for server (leave blank for all interfaces)
  enable_query?: boolean; // Whether to enable query protocol
  query_port?: number; // Port for query protocol
  enable_rcon?: boolean; // Whether to enable remote console (RCON)
  rcon_port?: number; // Port for RCON
  enable_jmx_monitoring?: boolean; // Whether to enable JMX monitoring

  // Other settings
  online_mode?: boolean; // Whether to verify usernames with Mojang servers
  enable_command_block?: boolean; // Whether to enable command blocks
  enable_status?: boolean; // Whether to enable server status response
  // Add more properties here...
}
