import { z } from 'zod'
import { adapter } from '../../services'

export const addressSchema = z.object({
  blockchain: z.string(),
  chainId: z.union([z.number().positive(), z.string()]),
  address: z.string(),
}).refine(({ blockchain, chainId, address }) => {
  const [_, bcConfig] = adapter.findBlockchain(blockchain) ?? []
  return bcConfig
    ? bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)
    : false // invalid blockchain
})

export type AddressConfig = z.infer<typeof addressSchema>
