import type { Nullable } from '@voire/type-utils'
import type { Web3Config } from '../../services'
import type { HexString } from '../hex'
import type { InferKey, InferSlug, InferValue } from '../utils'
import type { BlockchainConfig, BlockchainInfo } from './blockchain.types'

export type ChainID = HexString | number

export type ChainSlug = InferSlug<InferValue<Web3Config>['chains']>
export type ChainKey = InferKey<InferValue<Web3Config>['chains']>

export interface ChainConfig extends BlockchainConfig {
  chainId: ChainID
}

export interface ChainMetadata {
  label: string
  logo?: Nullable<string>
}

export interface ChainInfo extends ChainConfig, BlockchainInfo {
  chainMetadata: ChainMetadata
}
