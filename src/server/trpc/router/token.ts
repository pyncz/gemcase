import { publicProcedure, router } from '../trpc'
import { addressPathSchema } from '../../../models'
import { withValidAddress } from '../helpers'

export const tokenRouter = router({
  getMetadata: publicProcedure
    .input(addressPathSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getCoinContractMetadata(chain, address)
      })
    }),
})
