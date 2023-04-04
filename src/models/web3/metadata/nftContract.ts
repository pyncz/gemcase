import { z } from 'zod'
import { mapped } from '@pyncz/zod-key-mapper'
import { contractSchema } from './contract'

export const nftContractSchema = contractSchema.and(
  mapped(
    z.object({
      token_address: z.string(),
    }),
    { token_address: 'address' },
  ),
)

export type NftContractMetadata = z.infer<typeof nftContractSchema>
