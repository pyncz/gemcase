import type { Nullable } from '@voire/type-utils'
import type { Web3Data } from '../models'
import { isTokenId } from '../utils'
import { adapter } from './web3/adapter'

export const getValidWeb3Info = async (params: string[]): Promise<Nullable<Web3Data>> => {
  // Let's assume the params is a bc/chain/address/token config
  const [blockchain, chain, address, tokenId] = params

  if (blockchain) {
    const [bcKey, bcConfig] = adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      if (chain) {
        const [nwKey, nwConfig] = bcConfig.findChain(chain) ?? []

        if (nwKey && nwConfig) {
          // chain is valid
          if (address && bcConfig.validateAddress(address)) {
            // address is valid
            const addressMetadata = await bcConfig.getAddressMetadata(nwKey, address)

            if (addressMetadata.isNFT && isTokenId(tokenId)) {
              // can have a tokenId and the provided tokenId is valid
              return {
                blockchain: bcKey,
                blockchainMetadata: {
                  label: bcConfig.label,
                  logo: bcConfig.logo ?? null,
                },
                chain: nwKey!,
                chainMetadata: {
                  label: nwConfig.label,
                  logo: nwConfig.logo ?? null,
                  test: nwConfig.test ?? null,
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
              chain: nwKey,
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
            chain: nwKey,
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
