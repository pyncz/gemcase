import { z } from 'zod'
import { isEvmAddress, isHexString } from '../../utils'
import type { HexString } from '../hex'
import type { StringNumber } from '../number'
import type { EvmAddress } from '../web3'

export const hex = z.custom<HexString>(isHexString)

const stringNumber = z.custom<StringNumber>((val) => {
  return typeof val === 'string' ? !isNaN(+val) : false
})

export const numberLike = z.union([z.number(), hex, stringNumber])

export const evmAddress = z.custom<EvmAddress>(isEvmAddress)
