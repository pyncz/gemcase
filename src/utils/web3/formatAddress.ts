import { isHexString } from '../isHexString'
import truncate from 'smart-truncate'

export function formatAddress(address: string) {
  return isHexString(address)
    ? truncate(address, 10, { position: 5 })
    : address
}
