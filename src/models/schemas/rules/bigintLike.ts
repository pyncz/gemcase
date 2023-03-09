import type { ZodType, ZodTypeDef } from 'zod'
import { z } from 'zod'
import { isStringifiedBigint } from '../../../utils'
import type { StringifiedBigint } from '../../bigint'
import { hex } from './hex'

const stringifiedBigint: ZodType<StringifiedBigint, ZodTypeDef, string> = z.custom<StringifiedBigint>(isStringifiedBigint)
export const bigintLike = z.union([z.bigint(), hex, stringifiedBigint])
