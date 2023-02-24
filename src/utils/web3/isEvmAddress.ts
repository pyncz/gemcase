import { isHexString } from '../isHexString'
import type { EvmAddress } from '../../models'

/**
 * Checks if the address is a valid EVM address-like string
 * @param address Supposed address string
 * @returns Boolean, if the address is a valid hex address or ENS-resolvable string
 */
export const isEvmAddress = (address: string): address is EvmAddress => {
  return isHexString(address, 20) || /^[^\s]+\.[^\s]+$/i.test(address)
}
