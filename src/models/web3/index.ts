import type { Nullable } from '@voire/type-utils'
import type { AddressData } from './address'
import type { BlockchainData } from './blockchain'
import type { ChainData } from './chain'
import type { TokenData } from './token'

export * from './metadata'

export * from './provider'

export * from './blockchain'
export * from './chain'
export * from './address'
export * from './token'

export type Web3Data =
  | BlockchainData | ChainData | AddressData | TokenData

export interface Web3PublicConfig {
  blockchains: Record<string, {
    label: string
    logo: Nullable<string>
    chains: Record<string, {
      id: number | string
      label: string
      logo: Nullable<string>
      test: boolean
    }>
  }>
}
