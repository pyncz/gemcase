import type { NumberLike } from '@voire/type-utils'
import type { AddressData, AddressPath } from './address'

export interface TokenPath extends AddressPath {
  tokenId: NumberLike
}

export type TokenData = TokenPath & AddressData
