import { z } from "zod";

export const AngkatanSchema = z.object({
  id: z.number(),
  angkatan: z.coerce.number(),
});

export const CreateAngkatanSchema = z.object({
  angkatan: z.coerce.number(),
});
export type CreateAngkatanType = z.infer<typeof CreateAngkatanSchema>;
export type AngkatanType = z.infer<typeof AngkatanSchema>;
