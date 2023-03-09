import type { BigintLike, StringifiedBigint } from '../models'
import { isHexString } from './isHexString'

export const isStringifiedBigint = (value: any): value is StringifiedBigint => {
  if (typeof value === 'string') {
    try {
      return !!BigInt(value)
    } catch (e) {}
  }

  return false
}

export const isBigintLike = (value: any): value is BigintLike => {
  return typeof value === 'bigint' || isStringifiedBigint(value) || isHexString(value)
}
