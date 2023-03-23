import { optionalTokenSchema } from '../../../models'
import { withValidAddress } from '../helpers'
import { publicProcedure, router } from '../trpc'
import { nftContractRouter } from './nftContract'
import { nftTokenRouter } from './nftToken'
import { tokenRouter } from './token'
import { validateRouter } from './validate'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => true),

  // Common procedures
  validate: validateRouter,
  getMetadata: publicProcedure
    .input(optionalTokenSchema)
    .query(({ input }) => {
      const { tokenId } = input
      return withValidAddress(input, ({ blockchainConfig, chain, address }) => {
        return blockchainConfig.getMetadata(chain, address, tokenId)
      })
    }),

  // Specific-entity routes
  token: tokenRouter,
  nftContract: nftContractRouter,
  nftToken: nftTokenRouter,

  // test: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany()
  // }),
})

// export type definition of API
export type AppRouter = typeof appRouter
