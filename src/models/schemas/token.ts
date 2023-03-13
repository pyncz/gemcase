import { z } from 'zod'
import { addressSchema } from './address'
import { positiveNumberLike } from './rules'

export const tokenSchema = addressSchema.and(z.object({
  tokenId: positiveNumberLike,
}))

export const optionalTokenSchema = addressSchema.and(z.object({
  tokenId: positiveNumberLike.optional(),
}))
