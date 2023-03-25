import type { Nullable } from '@voire/type-utils'
import { z } from 'zod'
import type { Explorer } from '../../services/exploreAdapter'
import type { ChainKey } from '../../services/web3Adapter'
import type { BlockchainData, BlockchainPath } from './blockchain'

import { blockchainPathSchema } from './blockchain'

export interface ChainPath extends BlockchainPath {
  chain: ChainKey
}

export interface ExplorerConfig {
  label: string
  resolver: Explorer
}

export interface ChainMetadata {
  label: string
  logo?: Nullable<string>
  test?: Nullable<boolean>
  explorer?: Nullable<ExplorerConfig>
}

export interface ChainData extends ChainPath, BlockchainData {
  chainMetadata: ChainMetadata
}

export const chainPathSchema = blockchainPathSchema.extend({
  chain: z.union([z.number(), z.string()]), // z.custom<ChainKey>(),
})
