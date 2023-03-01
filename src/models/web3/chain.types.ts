import type { Nullable } from '@voire/type-utils'
import type { HexString } from '../hex'
import type { BlockchainConfig, BlockchainInfo } from './blockchain.types'

export type ChainID = HexString | number

export interface ChainConfig extends BlockchainConfig {
  chainId?: string | number
}

export interface ChainMetadata {
  label: string
  logo?: Nullable<string>
}

export interface ChainInfo extends ChainConfig, BlockchainInfo {
  chainMetadata: ChainMetadata
}
