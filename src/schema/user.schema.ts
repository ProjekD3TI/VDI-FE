import { z } from "zod";

export const UserSchema = z.object({
  id: z.coerce.number(),
  nim: z.string(),
  username: z.string(),
  email: z.email(),
  angkatan:z.number(),
  vm_id: z.number().nullable(),
});

export type UserType = z.infer<typeof UserSchema>;
