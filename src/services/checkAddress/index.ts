import type { Nullable } from '@voire/type-utils'
import { checkInterfaces, getMetadata, getTokenMetadata } from '@wiiib/check-evm-address'
import type { ChainID, EvmAddress } from '../../models'
import { JsonRpcProvider } from '../../models'
import { createAdapter, createBlockchainAdapter, isEvmAddress } from '../../utils'
import type { Methods } from './methods.types'

console.log('checkAddress.server')

const getEvmProvider = (chainId: ChainID, domain: string) => {
  // TODO: Check if env vars are imported by dotenv under the hood
  return new JsonRpcProvider(
    `https://${domain}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    +chainId,
  )
}

export const adapter = createAdapter({
  evm: createBlockchainAdapter(
    {
      validateAddress: isEvmAddress,
      async check(chainId, domain, address) {
        const { isContract, isIERC1155, isIERC20, isIERC721 } = await checkInterfaces(address, getEvmProvider(chainId, domain))
        return {
          isContract,
          isCoin: isIERC20,
          isNFT: isIERC721 || isIERC1155,
          isCollectibleNFT: isIERC1155,
        }
      },
      async getContractMetadata(chainId, domain, address): Promise<Nullable<Record<string, any>>> {
        const { metadata } = await getMetadata(address, getEvmProvider(chainId, domain)) ?? {}
        return metadata ?? null
      },
      async getTokenMetadata(chainId, domain, address, tokenId): Promise<Nullable<Record<string, any>>> {
        const { metadata } = await getTokenMetadata(address, getEvmProvider(chainId, domain), tokenId) ?? {}
        return metadata ?? null
      },
    } satisfies Methods<EvmAddress>,
    {
      1: {
        id: 1 as ChainID,
        label: 'Ethereum',
        infuraDomain: 'mainnet',
        aliases: ['0x1', 'ethereum', 'eth', 'mainnet'] as const,
      },
      137: {
        id: 137 as ChainID,
        label: 'Polygon',
        infuraDomain: 'polygon-mainnet',
        aliases: ['0x89', 'polygon', 'matic'] as const,
      },
    },
    {
      aliases: ['eip155'] as const,
    },
  ),
})
