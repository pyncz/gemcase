import type { Nullable } from '@voire/type-utils'

export interface BlockchainConfig {
  blockchain: string
}

export interface BlockchainMetadata {
  label: string
  logo?: Nullable<string>
}

export interface BlockchainInfo extends BlockchainConfig {
  blockchainMetadata: BlockchainMetadata
}
