import { z } from 'zod'

// Response with paginated data
export const paginated = <O, I>(schema: z.ZodType<O, z.ZodTypeDef, I>) => z.object({
  total: z.string().nullish(),
  cursor: z.string().nullish(),
  result: z.array(schema),
  // limit
})

export type Paginated<T> = z.infer<ReturnType<typeof paginated<T, T>>>

// Request to get paginated data
export const withPagination = <O, I>(schema: z.ZodType<O, z.ZodTypeDef, I>) => schema.and(z.object({
  cursor: z.string().optional(),
  limit: z.number().optional(),
}))

export type WithPagination<T> = z.infer<ReturnType<typeof withPagination<T, T>>>
