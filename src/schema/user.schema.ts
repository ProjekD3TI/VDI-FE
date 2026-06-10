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
    .min(1, "NIM wajib diisi")
    .regex(
      /^V34\d{5}$/,
      "Format NIM harus diawali V34 dan diikuti 5 digit angka (Contoh: V3421001)",
    ),

  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
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
    .min(3, "Username minimal 3 karakter")
    .regex(
      /^[a-zA-Z0-9.-]+$/,
      "Nama hanya boleh berisi huruf, angka, tanda hubung (-), dan titik (.) tanpa spasi",
    )
    .regex(/^[a-zA-Z0-9]/, "Nama harus diawali dengan huruf atau angka"),

  email: z
    .email("Format email tidak valid")
    .endsWith(
      "@student.uns.ac.id",
      "Email harus menggunakan domain resmi @student.uns.ac.id",
    ),

  angkatan_id: z.coerce.number({
    message: "Angkatan wajib dipilih",
  }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
