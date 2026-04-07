import { z } from "zod";

export const VmSchema = z.object({
  id: z.string(),
  hostname: z.string(),
  ip_address: z.string(),
  storage: z.number(),
  ram: z.number(),
  status: z.enum(["Running","Stopped"]),
});

export type VmTypes = z.infer<typeof VmSchema>;
