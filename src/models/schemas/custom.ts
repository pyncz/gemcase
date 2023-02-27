import { z } from 'zod'
import { isEvmAddress, isHexString, isStringifiedNumber } from '../../utils'
import type { HexString } from '../hex'
import type { StringifiedNumber } from '../number'
import type { EvmAddress } from '../web3'

export const hex = z.custom<HexString>(isHexString)

const stringifiedNumber = z.custom<StringifiedNumber>(isStringifiedNumber)

export const numberLike = z.union([z.number(), hex, stringifiedNumber])

export const evmAddress = z.custom<EvmAddress>(isEvmAddress)
