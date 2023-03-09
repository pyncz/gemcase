import { isBigintLike } from './isBigintLike'
import { isNumberLike } from './isNumberLike'

export const isPositive = (value: any): boolean => {
  return isNumberLike(value)
    ? Number(value) > 0
    : isBigintLike(value)
}
