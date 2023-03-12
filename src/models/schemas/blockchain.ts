import { z } from 'zod'

export const blockchainSchema = z.object({
  blockchain: z.string(),
})
