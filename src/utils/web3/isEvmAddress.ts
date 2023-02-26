import { isHexString } from '../isHexString'
import type { EvmAddress } from '../../models'

/**
 * Checks if the address is a valid EVM address-like string
 * @param value Supposed address string
 * @returns Boolean, if the address is a valid hex address or ENS-resolvable string
 */
export const isEvmAddress = (value: any): value is EvmAddress => {
  // TODO: Maybe use ethers' `isAddress` or `resolveAddress`
  return typeof value === 'string'
    ? isHexString(value, 20) || /^[^\s]+\.[^\s]+$/i.test(value)
    : false
}
