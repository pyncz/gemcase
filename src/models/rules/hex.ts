import type { ZodType, ZodTypeDef } from 'zod'
import { z } from 'zod'
import type { HexString } from '@voire/type-utils'
import { isHexString } from '../../utils'

export const hex: ZodType<HexString, ZodTypeDef, string> = z.custom<HexString>(isHexString)
