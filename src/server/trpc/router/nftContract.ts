import { publicProcedure, router } from '../trpc'
import { addressPathSchema, withPagination } from '../../../models'
import { withValidAddress } from '../helpers'
import { DEFAULT_PAGINATION_LIMIT } from '../../../consts'

export const nftContractRouter = router({
  getMetadata: publicProcedure
    .input(addressPathSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftContractMetadata(chain, address)
      })
    }),
  getTokens: publicProcedure
    .input(withPagination(addressPathSchema))
    .query(({ input }) => {
      const { cursor, limit = DEFAULT_PAGINATION_LIMIT } = input
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftContractTokens(chain, address, { cursor, limit })
      })
    }),
})
