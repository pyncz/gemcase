import type { ZodType, ZodTypeDef } from 'zod'
import { z } from 'zod'
import type { StringifiedBigint } from '@voire/type-utils'
import { isStringifiedBigint } from '../../utils'
import { hex } from './hex'

const stringifiedBigint: ZodType<StringifiedBigint, ZodTypeDef, string> = z.custom<StringifiedBigint>(isStringifiedBigint)

export const bigintLike = z.union(
  [z.bigint(), hex, stringifiedBigint],
).transform(String)
