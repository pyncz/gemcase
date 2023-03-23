import { publicProcedure, router } from '../trpc'
import { tokenSchema } from '../../../models'
import { withValidAddress } from '../helpers'

export const nftTokenRouter = router({
  getMetadata: publicProcedure
    .input(tokenSchema)
    .query(({ input }) => {
      const { tokenId } = input
      return withValidAddress(input, async ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftTokenMetadata(chain, address, tokenId)
      })
    }),
})
