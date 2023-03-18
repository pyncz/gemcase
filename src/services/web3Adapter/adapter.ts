import type { Nullable, Optional } from '@voire/type-utils'
import { checkInterfaces, resolveIpfs } from '@wiiib/check-evm-address'
import Moralis from 'moralis'
import type { BlockchainMetadata, CoinContractMarketMetadata, EvmAddress, InferSlug, NftContractMetadata, NftTokenMetadata, TokenTrait } from '../../models'
import { compareTraits, isEvmAddress, isTokenId } from '../../utils'
import { createAdapter, createBlockchainAdapter, findByKeyOrAlias } from './createAdapter'
import type { WithAliases } from './createAdapter'
import { evmChains } from './chains'
import { getEvmProvider, startMoralis } from './helpers'
import type { Methods } from './methods.types'

console.log('HERE I AM')

export const adapterConfig = {
  evm: createBlockchainAdapter(
    {
      label: 'EVM',
      logo: undefined as Optional<Nullable<string>>,
      aliases: ['eip155'] as const,

      // methods
      validateAddress: isEvmAddress,

      async getAddressMetadata(chain, address) {
        const [_, nwConfig] = findByKeyOrAlias(evmChains, chain) ?? []
        if (nwConfig) {
          const { id: chainId, rpcDomain } = nwConfig

          const { isContract, isIERC1155, isIERC20, isIERC721, type } = await checkInterfaces(address, getEvmProvider(chainId, rpcDomain))
          return {
            isContract,
            isCoin: isIERC20,
            isNFT: isIERC721 || isIERC1155,
            isCollectibleNFT: isIERC1155,
            standard: type ? type as string : null,
          }
        }
        throw new Error('Chain not found')
      },

      async getMetadata(chain, address, tokenId) {
        const blockchainPath = {
          blockchain: 'evm' as const,
        }

        const [nwKey, nwConfig] = findByKeyOrAlias(evmChains, chain) ?? []

        if (nwKey && nwConfig) {
          // chain is valid
          const chainPath = {
            ...blockchainPath,
            chain: nwKey,
          }

          if (this.validateAddress(address)) {
            // address is valid
            const addressMetadata = await this.getAddressMetadata(chain, address)
            const { isContract, isNFT } = addressMetadata

            const addressPath = {
              ...chainPath,
              address,
            }

            // Contract
            if (isContract) {
              // NFT Address
              if (isNFT) {
                // NFT
                if (isTokenId(tokenId)) {
                  const metadata = await this.getNftTokenMetadata(chain, address, tokenId)
                  if (metadata) {
                    return {
                      is: 'nft',
                      ...addressPath,
                      ...addressMetadata,
                      tokenId,
                      ...metadata,
                    }
                  } // -> fallback down to 'nftContract' if there's no metadata
                }
                // NFT Contract Address
                const metadata = await this.getNftContractMetadata(chain, address)
                if (metadata) {
                  return {
                    is: 'nftContract',
                    ...addressPath,
                    ...addressMetadata,
                    ...metadata,
                  }
                } // -> fallback down to 'account' if there's no metadata
              } else {
                // Coin contract address
                const metadata = await this.getCoinContractMetadata(chain, address)
                if (metadata) {
                  return {
                    is: 'coinContract',
                    ...addressPath,
                    ...addressMetadata,
                    ...metadata,
                  }
                } // -> fallback down to 'account' if there's no metadata
              }
            }

            // Regular address
            return {
              is: 'account',
              ...addressPath,
              ...addressMetadata,
            }
          }
        }

        return null
      },

      async getNftContractMetadata(chain, address) {
        const [_, nwConfig] = findByKeyOrAlias(evmChains, chain) ?? []
        if (nwConfig) {
          await startMoralis()
          const result = await Moralis.EvmApi.nft.getNFTContractMetadata({
            chain: nwConfig.id,
            address,
          })
          const data = result?.toJSON() ?? null
          return data
            ? resolveIpfs({
              symbol: data.symbol,
              name: data.name,
            }) as NftContractMetadata
            : null
        }
        throw new Error('Chain not found')
      },

      async getCoinContractMetadata(chain, address) {
        const [_, nwConfig] = findByKeyOrAlias(evmChains, chain) ?? []
        if (nwConfig) {
          await startMoralis()
          const result = await Moralis.EvmApi.token.getTokenMetadata({
            chain: nwConfig.id,
            addresses: [address],
          })
          const data = result?.toJSON()[0] ?? null

          if (data) {
            const marketResult = await Moralis.EvmApi.token.getTokenPrice({
              chain: nwConfig.id,
              address,
            })
            const marketData = marketResult?.toJSON() ?? null

            return resolveIpfs({
              name: data.name,
              symbol: data.symbol,
              decimals: +data.decimals,
              logo: data.logo,
              thumbnail: data.thumbnail,
              // TODO: Add market data
              marketData: {
                usdPrice: marketData.usdPrice,
                exchangeName: marketData.exchangeName,
                nativePrice: marketData.nativePrice
                  ? {
                      value: BigInt(marketData.nativePrice.value),
                      name: marketData.nativePrice.name,
                      symbol: marketData.nativePrice.symbol,
                      decimals: marketData.nativePrice.decimals,
                    }
                  : undefined,
              },
            }) as CoinContractMarketMetadata
          }

          return null
        }
        throw new Error('Chain not found')
      },

      async getNftTokenMetadata(chain, address, tokenId) {
        const [_, nwConfig] = findByKeyOrAlias(evmChains, chain) ?? []
        if (nwConfig) {
          await startMoralis()
          const result = await Moralis.EvmApi.nft.getNFTMetadata({
            chain: nwConfig.id,
            address,
            tokenId: tokenId.toString(),
          })
          const data = result?.toJSON() ?? null
          const metadata = data?.metadata ? JSON.parse(data.metadata) : undefined

          return data
            ? resolveIpfs({
              symbol: data.symbol,
              name: data.name,
              amount: data.amount ? +data.amount : 1,
              tokenUri: data.token_uri,
              metadata: data.metadata
                ? {
                    name: metadata.name as string,
                    description: metadata.description as Optional<string>,
                    image: metadata.image as string,
                    animationUrl: metadata.animation_url as Optional<string>,
                    externalUrl: metadata.external_url as Optional<string>,
                    attributes: (metadata.attributes as Optional<(string | TokenTrait)[]>)?.sort(compareTraits),
                  }
                : undefined,
            }) as NftTokenMetadata
            : null
        }
        throw new Error('Chain not found')
      },
    } satisfies WithAliases<string> & BlockchainMetadata & Methods<EvmAddress, InferSlug<typeof evmChains>>,
    evmChains,
  ),

  // TODO: Add blockchains?
  // - NEAR (maybe via Infura)
  // - Solana (maybe via Moralis)
  // - Aptos (maybe via Moralis)
}

export const web3Adapter = createAdapter(adapterConfig)
