import type { Nullable } from '@voire/type-utils'
import type { ChainKey } from '../../services/web3'
import type { HexString } from '../hex'
import type { BlockchainConfig, BlockchainInfo } from './blockchain'

export type ChainID = HexString | number

export interface ChainConfig extends BlockchainConfig {
  chainId: ChainID
}

export interface ChainMetadata {
  label: string
  logo?: Nullable<string>
  test?: Nullable<boolean>
}

export interface ChainInfo extends ChainConfig, BlockchainInfo {
  chainMetadata: ChainMetadata
  chain: ChainKey
}
