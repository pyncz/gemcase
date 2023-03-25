import { resolveIpfs } from '@wiiib/check-evm-address'
import { z } from 'zod'
import { priceSchema } from '../../price'
import { numberLike } from '../../rules'
import { contractSchema } from './contract'

const coinMarketDataSchema = z.object({
  nativePrice: priceSchema.extend({
    name: z.string(),
  }).nullish(),
  usdPrice: z.number(),
  exchangeName: z.string().nullish(),
})

const coinContractSchema = z.object({
  decimals: numberLike,
  logo: z.string(),
  thumbnail: z.string(),
  address: z.string(),
}).transform(data => resolveIpfs(data)).and(contractSchema)

export const coinContractMarketSchema = coinContractSchema.and(z.object({
  marketData: coinMarketDataSchema,
}))

export type CoinContractMetadata = z.infer<typeof coinContractSchema>
export type CoinContractMarketMetadata = z.infer<typeof coinContractMarketSchema>
