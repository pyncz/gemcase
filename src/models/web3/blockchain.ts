import type { Nullable } from '@voire/type-utils'
import type { BlockchainKey } from '../../services/web3'

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
