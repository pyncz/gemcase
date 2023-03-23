import { publicProcedure, router } from '../trpc'
import { addressPathSchema } from '../../../models'
import { withValidAddress } from '../helpers'

export const nftContractRouter = router({
  getMetadata: publicProcedure
    .input(addressPathSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftContractMetadata(chain, address)
      })
    }),
  getTokens: publicProcedure
    .input(addressPathSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftContractTokens(chain, address)
      })
    }),
})
