import truncate from 'smart-truncate'
import { isHexString } from '../isHexString'

export function formatAddress(address: string) {
  return isHexString(address)
    ? truncate(address, 10, { position: 5 })
    : address
}
