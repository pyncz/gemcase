import type { NumberLike } from '../../models'
import { isNumberLike } from '../isNumberLike'

export const isTokenId = (value: any): value is NumberLike => {
  return isNumberLike(value) && Number(value) > 0
}
