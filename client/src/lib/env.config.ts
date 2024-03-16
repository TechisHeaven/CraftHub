// Loading process.env as ENV interface

import { Config, ENV } from "../types/env.types";

//can get with typesafe sanitized environment direct if its undefined or not.
const getConfig = (): ENV => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};

// handle environment variables here if undefined then error throw
export const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }

  // if not then return all env variables
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

// now can use sanitizedConfig it will return typesafe sainitized variables
export default sanitizedConfig;
