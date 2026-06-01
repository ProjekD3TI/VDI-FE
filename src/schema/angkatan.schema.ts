import {z} from 'zod'

export const AngkatanSchema = z.object({
    id:z.number(),
    angkatan: z.number()
})

export type AngkatanType = z.infer<typeof AngkatanSchema>;