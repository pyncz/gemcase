import { z } from 'zod'

export const paginated = <O, I = O>(schema: z.ZodType<O, z.ZodTypeDef, I>) => z.object({
  cursor: z.string().nullish(),
  limit: z.number().nullish(),
  result: z.array(schema),
})

export type Paginated<T> = z.infer<ReturnType<typeof paginated<T>>>
