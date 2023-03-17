import type { InferField, InferKey, InferValue } from '@voire/type-utils'
import type { InferSlug } from '../../models'
import type { adapterConfig } from './adapter'

// Expose config for keys' extracting accross the app
export type Web3Config = typeof adapterConfig

// Provided blockchains' types
export type BlockchainKey = InferKey<Web3Config>
export type BlockchainAdapterConfig = InferValue<Web3Config>
export type BlockchainSlug = InferSlug<Web3Config>

// Provided chains' types
export type ChainKey = InferKey<InferValue<Web3Config>['chains']>
export type ChainAdapterConfig = InferValue<InferField<InferValue<Web3Config>, 'chains'>>
export type ChainSlug = InferSlug<InferField<InferValue<Web3Config>, 'chains'>>
