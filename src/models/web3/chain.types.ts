import type { HexString } from '../hex'
import type { BlockchainConfig } from './blockchain.types'

export type ChainID = HexString | number

export interface ChainConfig extends BlockchainConfig {
  chainId?: string | number
}
