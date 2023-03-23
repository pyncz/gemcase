import type { Nullable } from '@voire/type-utils'
import { z } from 'zod'
// import type { BlockchainKey } from '../../services/web3Adapter'

export interface BlockchainMetadata {
  label: string
  logo?: Nullable<string>
}

export interface BlockchainData extends BlockchainPath {
  blockchainMetadata: BlockchainMetadata
}

export const blockchainPathSchema = z.object({
  blockchain: z.string(), // z.custom<BlockchainKey>(),
})

export type BlockchainPath = z.infer<typeof blockchainPathSchema>
