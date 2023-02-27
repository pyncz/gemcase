import type { NumberLike, StringifiedNumber } from '../models'
import { isHexString } from './isHexString'

export const isStringifiedNumber = (value: any): value is StringifiedNumber => {
  return typeof value === 'string' ? !isNaN(+value) : false
}

export const isNumberLike = (value: any): value is NumberLike => {
  return typeof value === 'number' || isStringifiedNumber(value) || isHexString(value)
}
