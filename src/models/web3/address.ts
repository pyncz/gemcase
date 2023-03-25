import { z } from 'zod'
import type { ChainData } from './chain'
import type { AddressMetadata } from './metadata'

import { chainPathSchema } from './chain'

export type AddressData = AddressPath & ChainData & AddressMetadata

/**
 * NOTE: Additional in-schema validation of chain / address' compatibility via `.refine`
 * is disabled since validation methods are run in the procedure itself anyway.
 *
 * ```ts
 * addressPathSchema.refine(({ blockchain, chain, address }) => {
 *   const [_, bcConfig] = web3Adapter.findBlockchain(blockchain) ?? []
 *   return bcConfig
 *     ? bcConfig.validateChain(chain) && bcConfig.validateAddress(address)
 *     : false // invalid blockchain
 * })
 * ```
 */
export const addressPathSchema = chainPathSchema.extend({
  address: z.string(),
})

export type AddressPath = z.infer<typeof addressPathSchema>
