import { TRPCError } from '@trpc/server'
import type { z } from 'zod'
import type { addressSchema } from '../../../models'
import type { BlockchainAdapterConfig, BlockchainSlug, ChainAdapterConfig, ChainSlug } from '../../../services/web3'
import { adapter } from '../../../services/web3'

export const withValidAddress = <Return>(
  params: z.output<typeof addressSchema>,
  callback: (validatedConfig: {
    blockchain: BlockchainSlug
    blockchainConfig: BlockchainAdapterConfig
    chain: ChainSlug
    chainConfig: ChainAdapterConfig
    // TODO: Come up with more clean blockchain's address type?
    address: Parameters<BlockchainAdapterConfig['getAddressMetadata']>['1']
  }) => Return,
) => {
  const { blockchain, chain, address } = params

  const [_, blockchainConfig] = adapter.findBlockchain(blockchain) ?? []
  if (blockchainConfig && adapter.validateBlockchain(blockchain)) {
    const [_, chainConfig] = blockchainConfig.findChain(chain) ?? []
    if (chainConfig && blockchainConfig.validateChain(chain)) {
      if (blockchainConfig.validateAddress(address)) {
        return callback({
          blockchain,
          blockchainConfig,
          chain,
          chainConfig,
          address,
        })
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Invalid ${blockchainConfig.label} address`,
      })
    }
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Invalid ${blockchainConfig.label} chain`,
    })
  }
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'Blockchain not found',
  })
}
