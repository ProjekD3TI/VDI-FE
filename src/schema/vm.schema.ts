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

// Regex pattern untuk IP: 10.109.(0 atau 1).(1 - 255)
const ipRegex = /^10\.109\.[01]\.([1-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;

export const CreateVmSchema = z.object({
  // Field lain (sesuaikan dengan kebutuhan form Anda)
  user_id: z.number().int().min(1, { message: "User ID wajib dipilih" }),

  // Validasi IP Address
  ip_address: z
    .string()
    .nonempty("IP Address wajib diisi")
    .regex(
      ipRegex,
      "IP tidak valid! Harus berformat 10.109.x.y (x = 0/1, y = 1-255)",
    ),
});

// Export type untuk digunakan di form react-hook-form
export type CreateVmType = z.infer<typeof CreateVmSchema>;
