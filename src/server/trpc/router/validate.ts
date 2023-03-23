import { publicProcedure, router } from '../trpc'
import { addressPathSchema, blockchainPathSchema, chainPathSchema } from '../../../models'
import { web3Adapter } from '../../../services/web3Adapter'

export const validateRouter = router({
  validateBlockchain: publicProcedure
    .input(blockchainPathSchema)
    .query(({ input: { blockchain } }) => {
      return web3Adapter.validateBlockchain(blockchain)
    }),
  validateChain: publicProcedure
    .input(chainPathSchema)
    .query(({ input: { blockchain, chain } }) => {
      return web3Adapter.validateBlockchain(blockchain) && web3Adapter.validateChain(blockchain, chain)
    }),
  validateAddress: publicProcedure
    .input(addressPathSchema)
    .query(({ input: { blockchain, address } }) => {
      const [_, bcConfig] = web3Adapter.findBlockchain(blockchain) ?? []
      return bcConfig?.validateAddress(address) ?? false
    }),
})
