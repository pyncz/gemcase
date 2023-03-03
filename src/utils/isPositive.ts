import { isNumberLike } from './isNumberLike'

export const isPositive = (value: any): boolean => {
  return isNumberLike(value)
    ? +value > 0
    : false
}
