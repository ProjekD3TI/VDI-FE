import { z } from "zod";

export const VmSchema = z.object({
  vmid: z.number(),
  name: z.string(),
  user: z.string(),
  ip_address: z.string().nullable(),
  status: z.enum(["running", "stopped", "creating", "failed"]),
});

export type VmTypes = z.infer<typeof VmSchema>;

export const DetailVmSchema = z.object({
  vmid: z.number().nullable().optional(),
  name: z.string(),

  status: z.enum(["running", "stopped", "creating", "failed"]),

  cpus: z.number(),
  cpu_usage: z.number(),

  ram_used: z.number(),
  ram_total: z.number(),
  ram_available: z.number(),
  ram_usage_percent: z.number(),

  storage_total_allocated: z.number(),

  storage_used: z.number().nullable(),
  storage_total: z.number().nullable(),
  storage_available: z.number().nullable(),
  storage_usage_percent: z.number().nullable(),

  uptime: z.string(),

  ip_address: z.string().nullable(),
  template_id: z.number().nullable(),
});

export type DetailVmType = z.infer<typeof DetailVmSchema>;
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
  template_id: z.number(),
});

// Export type untuk digunakan di form react-hook-form
export type CreateVmType = z.infer<typeof CreateVmSchema>;
export const TemplateSchema = z.object({
  template_id: z.number(),
  name: z.string(),
  ram: z.number(),
  storage: z.number(),
  cpu: z.number(),
});

export type TemplateType = z.infer<typeof TemplateSchema>;
