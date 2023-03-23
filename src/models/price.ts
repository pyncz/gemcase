import { z } from 'zod'
import { intLike } from './rules'

export const priceSchema = z.object({
  value: intLike,
  symbol: z.string(),
  decimals: z.number().nullish(),
})

export type PriceData = z.infer<typeof priceSchema>
