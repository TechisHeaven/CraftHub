import axios from "axios";
import sanitizedConfig from "../lib/env.config";

export const ServerService = {
  CreateServer: async (serverName: string) => {
    // try {
    //   const url = sanitizedConfig.VITE_API_URL;
    //   let result = await fetch(`${url}/api/server/create/server`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "PUT",
    //     body: JSON.stringify(serverName),
    //   });
    //   return result.json();
    // } catch (error: any) {
    //   if (error) {
    //     console.log(error);
    //     throw new Error(error);
    //   }
    // }
    // const result = await axios.post(
    //   "http://localhost:3000/api/server",
    //   serverName
    // );
    // console.log(result.data.json());
    // return result.data.json();
    await axios
      .post("http://localhost:3000/api/server", {
        serverName,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        if (err) {
          const error = err.response.data;
          throw Error(error);
        }
        return err;
      });
  },
};
