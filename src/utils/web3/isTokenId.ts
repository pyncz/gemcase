import type { NumberLike } from '@voire/type-utils'
import { isNumberLike } from '../isNumberLike'

export const isTokenId = (value: any): value is NumberLike => {
  return isNumberLike(value) && Number(value) > 0
}
