import type { Nullable } from '@voire/type-utils'
import type { Web3Config } from '../../services'
import type { InferKey, InferSlug } from '../utils'

export type BlockchainSlug = InferSlug<Web3Config, string>
export type BlockchainKey = InferKey<Web3Config>

export interface BlockchainConfig {
  blockchain: BlockchainKey
}

export interface BlockchainMetadata {
  label: string
  logo?: Nullable<string>
}

export interface BlockchainInfo extends BlockchainConfig {
  blockchainMetadata: BlockchainMetadata
}
