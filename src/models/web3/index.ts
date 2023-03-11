import type { Nullable } from '@voire/type-utils'
import type { AddressInfo } from './address'
import type { BlockchainInfo } from './blockchain'
import type { ChainInfo } from './chain'
import type { TokenInfo } from './token'

export * from './provider'

export * from './blockchain'
export * from './chain'
export * from './address'

export * from './coin'
export * from './token'

export type Web3Params =
  | BlockchainInfo | ChainInfo | AddressInfo | TokenInfo

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
