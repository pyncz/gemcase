import type { BigintLike, NumberLike } from './number'

export interface PriceData<T extends NumberLike | BigintLike = NumberLike | BigintLike> {
  value: T
  symbol: string
  decimals?: number
}
