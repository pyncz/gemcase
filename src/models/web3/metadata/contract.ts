import { z } from 'zod'

export const contractSchema = z.object({
  name: z.string(),
  symbol: z.string(),
})
