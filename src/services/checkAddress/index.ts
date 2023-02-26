import type { Nullable } from '@voire/type-utils'
import { checkInterfaces, getMetadata, getTokenMetadata } from '@wiiib/check-evm-address'
import type { ChainID, EvmAddress } from '../../models'
import { JsonRpcProvider } from '../../models'
import { createAdapter, createBlockchainAdapter, isEvmAddress } from '../../utils'
import type { Methods } from './methods.types'

const getEvmProvider = (chainId: ChainID, domain: string) => {
  // TODO: Check if env vars are imported by dotenv under the hood
  return new JsonRpcProvider(
    `https://${domain}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    +chainId,
  )
}

const evmChains = {
  eth: {
    id: 1 as ChainID,
    label: 'Ethereum Mainnet',
    rpcDomain: 'mainnet',
    aliases: ['0x1', 'ethereum', 'mainnet', 'ethereum-mainnet', 1] as const,
  },
  goerli: {
    id: 5 as ChainID,
    label: 'Goerli Testnet',
    rpcDomain: 'goerli',
    aliases: ['0x5', 'testnet', 'goerli-testnet', 5] as const,
    test: true,
  },
  sepolia: {
    id: 11155111 as ChainID,
    label: 'Sepolia Testnet',
    rpcDomain: 'sepolia',
    aliases: ['0xaa36a7', 'sepolia-testnet', 11155111] as const,
    test: true,
  },
  polygon: {
    id: 137 as ChainID,
    label: 'Polygon',
    rpcDomain: 'polygon-mainnet',
    aliases: ['0x89', 'matic', 'polygon-mainnet', 'matic-mainnet', 137] as const,
  },
  mumbai: {
    id: 80001 as ChainID,
    label: 'Matic Mumbai Testnet',
    rpcDomain: 'polygon-mumbai',
    aliases: ['0x13881', 'polygon-mumbai', 80001] as const,
    test: true,
  },
  avalanche: {
    id: 43114 as ChainID,
    label: 'Avalanche C-Chain',
    rpcDomain: 'avalanche-mainnet',
    aliases: ['0xa86a', 'avalanche-mainnet', 43114] as const,
  },
  avalancheTestnet: {
    id: 43113 as ChainID,
    label: 'Avalanche Fuji Testnet',
    rpcDomain: 'avalanche-fuji',
    aliases: ['0xa869', 'avalanche-fuji', 'fuji', 43113] as const,
    test: true,
  },
  palm: {
    id: 11297108109 as ChainID,
    label: 'Palm',
    rpcDomain: 'palm-mainnet',
    aliases: ['0x2a15c308d', 'palm-mainnet', 11297108109] as const,
  },
  arbitrum: {
    id: 42161 as ChainID,
    label: 'Arbitrum One',
    rpcDomain: 'arbitrum-mainnet',
    aliases: ['0xa4b1', 'arbitrum-mainnet', 42161] as const,
  },

  // TODO: Add networks?
  //
  // Infura doesn't support them. Wish could use Moralis as the RPC provider.
  //   56: BSC
  //   97: BSC Testnet
  //   250: Fantom
  //   25: Cronos
  //   338: Cronos Testnet
  //
  // Moralis doesn't support them.
  //   42220: Celo
  //   44787: Celo Alfajores Testnet
  //   11297108099: Palm Testnet
  //   10: Optimism
  //   420: Optimism Goerli Testnet
  //   421613: Arbitrum Goerli Testnet
  //   1313161554: Aurora
  //   1313161555: Aurora Testnet
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
        const { metadata } = await getTokenMetadata(address, getEvmProvider(chainId, domain), +tokenId) ?? {}
        return metadata ?? null
      },
      findChainById(chainId) {
        return Object.entries(evmChains).find(([_, nwConfig]) => {
          return chainId === nwConfig.id
        }) ?? null
      },
      validateChainById(chainId) {
        const [_, nwConfig] = this.findChainById(chainId) ?? []
        return !!nwConfig
      },
    } satisfies Methods<EvmAddress, ChainID>,
    evmChains,
    {
      aliases: ['eip155'] as const,
    },
  ),

  // TODO: Add blockchains?
  // - NEAR (maybe via Infura)
  // - Solana (maybe via Moralis)
  // - Aptos (maybe via Moralis)
})
