import { publicProcedure, router } from '../trpc'
import { addressPathSchema, withPagination } from '../../../models'
import { withValidAddress } from '../helpers'
import { DEFAULT_PAGINATION_LIMIT } from '../../../consts'

export const accountRouter = router({
  getTokens: publicProcedure
    .input(withPagination(addressPathSchema))
    .query(({ input }) => {
      const { cursor, limit = DEFAULT_PAGINATION_LIMIT } = input
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getAccountNFTs(chain, address, { cursor, limit })
      })
    }),
})
