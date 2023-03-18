import type { HexString, Nullable } from '@voire/type-utils'
import type { Explorer } from '../../services/exploreAdapter'
import type { ChainKey } from '../../services/web3Adapter'
import type { BlockchainData, BlockchainPath } from './blockchain'

export type EvmChainID = HexString | number

export interface ChainPath extends BlockchainPath {
  chain: ChainKey
}

export interface ChainMetadata {
  label: string
  logo?: Nullable<string>
  test?: Nullable<boolean>
  explorer?: Nullable<{
    label: string
    resolver: Explorer
  }>
}

export interface ChainData extends ChainPath, BlockchainData {
  chainMetadata: ChainMetadata
}
