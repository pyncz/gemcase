import { publicProcedure, router } from '../trpc'
import { addressSchema, blockchainSchema, chainSchema } from '../../../models'
import { web3Adapter } from '../../../services/web3Adapter'

export const validateRouter = router({
  validateBlockchain: publicProcedure
    .input(blockchainSchema)
    .query(({ input: { blockchain } }) => {
      return web3Adapter.validateBlockchain(blockchain)
    }),
  validateChain: publicProcedure
    .input(chainSchema)
    .query(({ input: { blockchain, chain } }) => {
      return web3Adapter.validateBlockchain(blockchain) && web3Adapter.validateChain(blockchain, chain)
    }),
  validateAddress: publicProcedure
    .input(addressSchema)
    .query(({ input: { blockchain, address } }) => {
      const [_, bcConfig] = web3Adapter.findBlockchain(blockchain) ?? []
      return bcConfig?.validateAddress(address) ?? false
    }),
})
