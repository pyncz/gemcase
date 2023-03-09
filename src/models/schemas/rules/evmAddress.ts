import type { ZodType, ZodTypeDef } from 'zod'
import { z } from 'zod'
import { isEvmAddress } from '../../../utils'
import type { EvmAddress } from '../../web3'

export const evmAddress: ZodType<EvmAddress, ZodTypeDef, string> = z.custom<EvmAddress>(isEvmAddress)
