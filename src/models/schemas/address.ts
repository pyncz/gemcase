import { z } from 'zod'
import { chainSchema } from './chain'

/**
 * NOTE: Additional in-schema validation of chain / address' compatibility via `.refine`
 * is disabled since validation methods are run in the procedure itself anyway.
 *
 * ```ts
 * addressSchema.refine(({ blockchain, chain, address }) => {
 *   const [_, bcConfig] = adapter.findBlockchain(blockchain) ?? []
 *   return bcConfig
 *     ? bcConfig.validateChain(chain) && bcConfig.validateAddress(address)
 *     : false // invalid blockchain
 * })
 * ```
 */
export const addressSchema = z.object({
  address: z.string(),
}).merge(chainSchema)
