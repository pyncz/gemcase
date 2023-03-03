import { z } from 'zod'
import { addressSchema } from './address.types'
import { numberLike } from './custom'

export const tokenSchema = addressSchema.and(z.object({
  tokenId: numberLike,
}))
