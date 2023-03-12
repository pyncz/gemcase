import type { Nullable } from '@voire/type-utils'
import type { BlockchainKey } from '../../services/web3'

export interface BlockchainPath {
  blockchain: BlockchainKey
}

export interface BlockchainMetadata {
  label: string
  logo?: Nullable<string>
}

export interface BlockchainData extends BlockchainPath {
  blockchainMetadata: BlockchainMetadata
}
