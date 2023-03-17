import type { ZodType, ZodTypeDef } from 'zod'
import { z } from 'zod'
import type { StringifiedNumber } from '@voire/type-utils'
import { isStringifiedNumber } from '../../../utils'
import { hex } from './hex'

const stringifiedNumber: ZodType<StringifiedNumber, ZodTypeDef, string> = z.custom<StringifiedNumber>(isStringifiedNumber)
const positiveStringifiedNumber: ZodType<StringifiedNumber, ZodTypeDef, string> = z.custom<StringifiedNumber>(
  (value: any) => value && isStringifiedNumber(value) && Number(value) > 0,
)

export const numberLike = z.union([z.number(), hex, stringifiedNumber])
export const positiveNumberLike = z.union([z.number().positive(), hex, positiveStringifiedNumber])
