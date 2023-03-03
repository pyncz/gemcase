import type { Nullable } from '@voire/type-utils'
import type { Flags } from '../utils'
import type { HexString } from '../hex'
import type { ChainConfig, ChainInfo } from './chain.types'

export type AddressMetadata = Flags<
  | 'isContract'
  | 'isCoin'
  | 'isNFT'
  | 'isCollectibleNFT'
> & {
  standard: Nullable<string>
}

export type HexAddress = HexString

// NOTE: Top Level Domains used to be just `.eth` or `.test`
// but since ENS collaborated with DNS, it may be any domain, e.g. `.xyz` etc
type TLD = string

export type EnsAddress = `${string}.${TLD}`
export type EvmAddress = HexAddress | EnsAddress

export interface AddressConfig extends ChainConfig {
  address: string
}

export type AddressInfo = AddressConfig & ChainInfo & AddressMetadata
