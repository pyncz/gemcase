import type { z } from 'zod'
import { contractSchema } from './contract'

export const nftContractSchema = contractSchema

export type NftContractMetadata = z.infer<typeof nftContractSchema>
