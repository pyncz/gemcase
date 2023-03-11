import type { BigintLike } from './bigint'
import type { NumberLike } from './number'

export interface PriceData<T extends NumberLike | BigintLike = NumberLike | BigintLike> {
  value: T
  symbol: string
  decimals?: number
}
