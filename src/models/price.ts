import type { BigintLike, NumberLike } from '@voire/type-utils'

export interface PriceData<T extends NumberLike | BigintLike = NumberLike | BigintLike> {
  value: T
  symbol: string
  decimals?: number
}
