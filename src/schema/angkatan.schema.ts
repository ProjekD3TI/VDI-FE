import { z } from "zod";

export const AngkatanSchema = z.object({
  id: z.number().optional(),
  angkatan: z.coerce.number(),
});

export type AngkatanType = z.infer<typeof AngkatanSchema>;
