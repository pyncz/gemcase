import type { NumberLike, StringifiedNumber } from '../models'
import { isHexString } from './isHexString'

export const isStringifiedNumber = (value: any): value is StringifiedNumber => {
  if (value) {
    return typeof value === 'string'
      ? !isNaN(Number(value))
      : false
  }
  return false
}

export const isNumberLike = (value: any): value is NumberLike => {
  if (value) {
    return typeof value === 'number' || isStringifiedNumber(value) || isHexString(value)
  }
  return false
}
