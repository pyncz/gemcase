import { z } from 'zod'
import { positiveNumberLike } from './rules'

export const exploreSchema = z.object({
  blockchain: z.string(),
  chainId: z.union([positiveNumberLike, z.string()]),
  address: z.string(),
  tokenId: positiveNumberLike.optional(),
})

export type ExploreFormInput = z.input<typeof exploreSchema>
export type ExploreFormOutput = z.output<typeof exploreSchema>
