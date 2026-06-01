import { z } from "zod";

export const UserSchema = z.object({
  id: z.coerce.number(),
  nim: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.email(),
  angkatan: z.number(),
  has_vm: z.boolean(),
  created_at: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  nim: z.string().min(1, "NIM wajib diisi"),

  name: z.string().min(3, "Nama minimal 3 karakter"),

  username: z.string().min(3, "Username minimal 3 karakter"),

  email: z.email("Format email tidak valid"),

  angkatan_id: z.coerce.number({
    message: "Angkatan wajib dipilih",
  }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
