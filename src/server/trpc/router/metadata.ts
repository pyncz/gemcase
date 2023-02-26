import { publicProcedure, router } from '../trpc'
import type { ChainID, EvmAddress } from '../../../models'
import { addressSchema, tokenSchema } from '../../../models'
import { adapter } from '../../../services'

export const metadataRouter = router({
  getContractMetadata: publicProcedure
    .input(addressSchema)
    .query(({ input }) => {
      const [_bc, bcConfig] = adapter.findBlockchain(input.blockchain) ?? []

      if (bcConfig) {
        const [_nw, nwConfig] = bcConfig.findChainById(input.chainId) ?? []
        if (nwConfig) {
          return bcConfig.getContractMetadata(
            input.chainId as ChainID,
            nwConfig.rpcDomain,
            input.address as EvmAddress,
          )
        }
        throw new Error('Chain not found')
      }
      throw new Error('Blockchain not found')
    }),
  getTokenMetadata: publicProcedure
    .input(tokenSchema)
    .query(({ input }) => {
      const [_bc, bcConfig] = adapter.findBlockchain(input.blockchain) ?? []

      if (bcConfig) {
        const [_nw, nwConfig] = bcConfig.findChainById(input.chainId) ?? []
        if (nwConfig) {
          return bcConfig.getTokenMetadata(
            input.chainId as ChainID,
            nwConfig.rpcDomain,
            input.address as EvmAddress,
            input.tokenId,
          )
        }
        throw new Error('Chain not found')
      }
      throw new Error('Blockchain not found')
    }),
  // test: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany()
  // }),
})
