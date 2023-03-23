import type { NumberLike } from '@voire/type-utils'
import { positiveNumberLike } from '../rules'
import type { AddressData, AddressPath } from './address'

import { addressPathSchema } from './address'

export interface TokenPath extends AddressPath {
  tokenId: NumberLike
}

export type TokenData = TokenPath & AddressData

export const tokenSchema = addressPathSchema.extend({
  tokenId: positiveNumberLike,
})

export const optionalTokenSchema = tokenSchema.extend({
  tokenId: positiveNumberLike.optional(),
})
