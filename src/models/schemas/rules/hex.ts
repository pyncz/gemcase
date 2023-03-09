import type { ZodType, ZodTypeDef } from 'zod'
import { z } from 'zod'
import { isHexString } from '../../../utils'
import type { HexString } from '../../hex'

export const hex: ZodType<HexString, ZodTypeDef, string> = z.custom<HexString>(isHexString)
