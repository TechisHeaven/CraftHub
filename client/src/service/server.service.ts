import axios from "axios";
import sanitizedConfig from "../lib/env.config";

export const ServerService = {
  CreateServer: async (serverName: string, callback: Function) => {
    await axios
      .post("http://localhost:3000/api/server", {
        serverName,
      })
      .then((response) => {
        return callback(response.data);
      })
      .catch((err) => {
        throw err.response.data;
      });
  },
};
