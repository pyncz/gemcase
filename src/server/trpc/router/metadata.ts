import { publicProcedure, router } from '../trpc'
import { addressSchema, optionalTokenSchema, tokenSchema } from '../../../models'
import { withValidAddress } from '../helpers'

export const metadataRouter = router({
  getAddressMetadata: publicProcedure
    .input(addressSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getAddressMetadata(chain, address)
      })
    }),
  getMetadata: publicProcedure
    .input(optionalTokenSchema)
    .query(({ input }) => {
      const { tokenId } = input
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getMetadata(chain, address, tokenId)
      })
    }),
  getNftContractMetadata: publicProcedure
    .input(addressSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftContractMetadata(chain, address)
      })
    }),
  getNftTokenMetadata: publicProcedure
    .input(tokenSchema)
    .query(({ input }) => {
      const { tokenId } = input
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getNftTokenMetadata(chain, address, tokenId)
      })
    }),
  getCoinContractMetadata: publicProcedure
    .input(addressSchema)
    .query(({ input }) => {
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getCoinContractMetadata(chain, address)
      })
    }),
  // test: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany()
  // }),
})
