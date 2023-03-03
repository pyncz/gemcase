import { z } from 'zod'

/**
 * NOTE: Additional in-schema validation via `.refine` is disabled
 * since validation methods are run in the procidore itself anyway
 * in order to ensure the types are suitable.
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
  chainId: z.union([z.number().positive(), z.string()]),
  address: z.string(),
})
