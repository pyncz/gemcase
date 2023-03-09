import { z } from 'zod'
import { positiveNumberLike } from './rules'

/**
 * NOTE: Additional in-schema validation of chain / address' compatibility via `.refine`
 * is disabled since validation methods are run in the procedure itself anyway.
 *
 * ```ts
 * addressSchema.refine(({ blockchain, chainId, address }) => {
 *   const [_, bcConfig] = adapter.findBlockchain(blockchain) ?? []
 *   return bcConfig
 *     ? bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)
 *     : false // invalid blockchain
 * })
 * ```
 */
export const addressSchema = z.object({
  blockchain: z.string(),
  chainId: z.union([positiveNumberLike, z.string()]),
  address: z.string(),
})
