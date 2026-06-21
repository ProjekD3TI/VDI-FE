import {  z } from "zod";

// 1. Schema untuk Storage
export const StorageSchema = z.object({
  name: z.string(),
  type: z.string(),
  total_gb: z.number(),
  used_gb: z.number(),
  available_gb: z.number(),
});

// 2. Schema untuk Memory
export const MemorySchema = z.object({
  total_gb: z.number(),
  used_gb: z.number(),
  available_gb: z.number(),
});

// 3. Schema untuk CPU
export const CpuSchema = z.object({
  usage_percentage: z.number(),
  cores: z.number(),
  // Karena load average selalu mengembalikan 3 angka (1 menit, 5 menit, 15 menit)
  load_avg: z
    .tuple([z.number(), z.number(), z.number()])
    .or(z.array(z.number())),
});

// 4. Schema Utama (Gabungan)
export const ProxmoxMetricsSchema = z.object({
  cpu: CpuSchema,
  memory: MemorySchema,
  storage: z.array(StorageSchema),
  uptime_seconds: z.number(),
});
export const StatisticNodes = z.object({
  labels: z.string().array(),
  cpu: z.number().array(),
  memory: z.number().array(),
});

export const DetailMonitorSchema = z.object({
  userCount: z.number(),
  vms: z.number(),
  ip_address: z.string(),
  node: z.string(),
});

export type DetailMonitorType = z.infer<typeof DetailMonitorSchema>;

// 5. Ekstrak TypeScript Types secara otomatis dari Zod Schema
export type StorageMetrics = z.infer<typeof StorageSchema>;
export type MemoryMetrics = z.infer<typeof MemorySchema>;
export type CpuMetrics = z.infer<typeof CpuSchema>;
export type ProxmoxMetrics = z.infer<typeof ProxmoxMetricsSchema>;
export type ChartMetrics = z.infer<typeof StatisticNodes>;
