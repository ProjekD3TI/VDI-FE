import { z } from "zod";

// Skema untuk satu baris data IP Address
export const ipAddressSchema = z.object({
  id: z.number(),
  ip_address: z.string(),
  status: z.enum(["free", "used"]).optional(),
});

// Ekspor tipe agar bisa digunakan di komponen dan service
export type IpAddressType = z.infer<typeof ipAddressSchema>;
