import { publicProcedure, router } from '../trpc'
import { addressSchema, blockchainSchema, chainSchema } from '../../../models'
import { adapter } from '../../../services/web3'

export const validateRouter = router({
  validateBlockchain: publicProcedure
    .input(blockchainSchema)
    .query(({ input: { blockchain } }) => {
      return adapter.validateBlockchain(blockchain)
    }),
  validateChain: publicProcedure
    .input(chainSchema)
    .query(({ input: { blockchain, chain } }) => {
      return adapter.validateBlockchain(blockchain) && adapter.validateChain(blockchain, chain)
    }),
  validateAddress: publicProcedure
    .input(addressSchema)
    .query(({ input: { blockchain, address } }) => {
      const [_, bcConfig] = adapter.findBlockchain(blockchain) ?? []
      return bcConfig?.validateAddress(address) ?? false
    }),
})
