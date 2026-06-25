import { z } from "zod";

export const UserSchema = z.object({
  id: z.coerce.number(),
  nim: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.email(),
  angkatan: z.number(),
  vmid: z.number().nullable().optional(),
  vm_status: z
    .enum(["stopped", "running", "failed", "creating"])
    .nullable()
    .optional(),
  created_at: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  nim: z
    .string()
    .min(1, "NIM is required.")
    .regex(
      /^V34\d{5}$/,
      "The NIM format must begin with V34 and be followed by 5 digits (Example: V3421001).",
    ),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .transform(
      (val) =>
        val
          .toLowerCase() // Ubah semua menjadi huruf kecil dulu agar seragam
          .split(" ") // Pisahkan berdasarkan spasi menjadi array kata
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
          .join(" "), // Gabungkan kembali dengan spasi
    ),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .regex(
      /^[a-zA-Z0-9.-]+$/,
      "The name may only contain letters, numbers, hyphens (-), and periods (.) without spaces",
    )
    .regex(/^[a-zA-Z0-9]/, "The name must start with a letter or a number."),

  email: z
    .email("Invalid email format.")
    .endsWith(
      "@student.uns.ac.id",
      "The email must use the official @student.uns.ac.id domain.",
    ),

  angkatan_id: z.coerce.number({
    message: "Angkatan wajib dipilih",
  }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
