import type { Nullable } from '@voire/type-utils'
import type { Web3Params } from '../models'
import { isNumberLike } from '../utils/isNumberLike'
import { adapter } from './checkAddress'

export const getValidWeb3Params = async (params: string[]): Promise<Nullable<Web3Params>> => {
  // Let's assume the params is a bc/chain/address/token config
  const [blockchain, chain, address, tokenId] = params

  if (blockchain) {
    const [bcKey, bcConfig] = adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      if (chain) {
        const [_, nwConfig] = bcConfig.findChain(chain) ?? []

        if (nwConfig) {
          // chain is valid
          if (address && bcConfig.validateAddress(address)) {
            // address is valid
            const addressMetadata = await bcConfig.check(nwConfig.id, nwConfig.rpcDomain, address)

            if (addressMetadata.isNFT && isNumberLike(tokenId) && +tokenId > 0) {
              // can have a tokenId and the provided tokenId is valid
              return {
                blockchain: bcKey,
                blockchainMetadata: {
                  label: bcConfig.label,
                  logo: bcConfig.logo ?? null,
                },
                chainId: nwConfig.id,
                chainMetadata: {
                  label: nwConfig.label,
                  logo: nwConfig.logo ?? null,
                },
                address,
                ...addressMetadata,
                tokenId,
              }
            }

            return {
              blockchain: bcKey,
              blockchainMetadata: {
                label: bcConfig.label,
                logo: bcConfig.logo ?? null,
              },
              chainId: nwConfig.id,
              chainMetadata: {
                label: nwConfig.label,
                logo: nwConfig.logo ?? null,
              },
              address,
              ...addressMetadata,
            }
          }

          return {
            blockchain: bcKey,
            blockchainMetadata: {
              label: bcConfig.label,
              logo: bcConfig.logo ?? null,
            },
            chainId: nwConfig.id,
            chainMetadata: {
              label: nwConfig.label,
              logo: nwConfig.logo ?? null,
            },
          }
        }
      }

      return {
        blockchain: bcKey,
        blockchainMetadata: {
          label: bcConfig.label,
          logo: bcConfig.logo ?? null,
        },
      }
    }
  }

  return null
}
