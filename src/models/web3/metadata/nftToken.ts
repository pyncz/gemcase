import { resolveIpfs } from '@wiiib/check-evm-address'
import { z } from 'zod'
import { intLike, numberLike } from '../../rules'
import { fromJSON, mapped } from '../../utils'
import { nftContractSchema } from './nftContract'

export const tokenTraitSchema = z.object({
  trait_type: z.string().nullish(),
  value: z.any().transform(v => JSON.stringify(v)),
  display_type: z.enum(['string', 'number']).nullish(),
  max_value: z.number().nullish(),
  trait_count: z.number().nullish(),
  order: z.number().nullish(),
})

const nftTokenMetadataSchema = (
  mapped(
    mapped(
      z.object({
        name: z.string().nullish(),
        description: z.string().nullish(),
        image: z.string().nullish(),
        animation_url: z.string().nullish(),
        external_url: z.string().nullish(),
        attributes: z.array(z.union([tokenTraitSchema, z.string()])).nullish().default([]),
      }),
      'animation_url', 'animationUrl',
    ),
    'external_url', 'externalUrl',
  )
).transform(data => resolveIpfs(data))

export const nftTokenSchema = nftContractSchema.and(
  mapped(
    mapped(
      z.object({
        token_id: numberLike,
        amount: intLike.nullish().default(1).transform(String),
        token_uri: z.string().nullish(),
        metadata: fromJSON(nftTokenMetadataSchema).nullish(),
      }),
      'token_uri', 'tokenUri',
    ),
    'token_id', 'tokenId',
  ),
)

export type TokenTrait = z.infer<typeof tokenTraitSchema>
export type NftTokenMetadata = z.infer<typeof nftTokenSchema>
