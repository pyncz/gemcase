import { publicProcedure, router } from '../trpc'
import { addressSchema, tokenSchema } from '../../../models'
import { adapter } from '../../../services'

export const metadataRouter = router({
  getNftContractMetadata: publicProcedure
    .input(addressSchema)
    .query(({ input: { blockchain, chainId, address } }) => {
      const [_, bcConfig] = adapter.findBlockchain(blockchain) ?? []
      if (bcConfig && bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)) {
        return bcConfig.getNftContractMetadata(
          chainId,
          address,
        )
      }
      throw new Error('Blockchain not found')
    }),
  getNftTokenMetadata: publicProcedure
    .input(tokenSchema)
    .query(({ input: { blockchain, chainId, address, tokenId } }) => {
      const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
      if (bcConfig && bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)) {
        return bcConfig.getNftTokenMetadata(
          chainId,
          address,
          tokenId,
        )
      }
      throw new Error('Blockchain not found')
    }),
  getCoinContractMetadata: publicProcedure
    .input(addressSchema)
    .query(({ input: { blockchain, chainId, address } }) => {
      const [_, bcConfig] = adapter.findBlockchain(blockchain) ?? []
      if (bcConfig && bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)) {
        return bcConfig.getCoinContractMetadata(
          chainId,
          address,
        )
      }
      throw new Error('Blockchain not found')
    }),
  // test: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany()
  // }),
})
