import { z } from "zod";

export const ServerSchema = z.object({
  serverName: z
    .string()
    .min(1, "serverName is required")
    .max(20, "serverName maximum characters"),
});
