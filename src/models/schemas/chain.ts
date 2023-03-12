import { z } from 'zod'
import { blockchainSchema } from './blockchain'

export const chainSchema = z.object({
  chain: z.union([z.number(), z.string()]),
}).merge(blockchainSchema)
