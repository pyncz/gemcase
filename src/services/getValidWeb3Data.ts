import type { Nullable } from '@voire/type-utils'
import type { Web3Data } from '../models'
import { isTokenId } from '../utils'
import { web3Adapter } from './web3Adapter'

export const getValidWeb3Data = async (
  blockchain?: string,
  chain?: string | number,
  address?: string,
  tokenId?: string,
): Promise<Nullable<Web3Data>> => {
  if (blockchain) {
    const [bcKey, bcConfig] = web3Adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      if (chain) {
        const [nwKey, nwConfig] = bcConfig.findChain(chain) ?? []

        if (nwKey && nwConfig) {
          // chain is valid
          if (address && bcConfig.validateAddress(address)) {
            // address is valid
            const addressMetadata = await bcConfig.getAddressMetadata(nwKey, address)
            const { isContract, isNFT } = addressMetadata

            if (isNFT && isTokenId(tokenId)) {
              // can have a tokenId and the provided tokenId is valid
              return {
                is: 'nft',
                blockchain: bcKey,
                blockchainMetadata: {
                  label: bcConfig.label,
                  logo: bcConfig.logo ?? null,
                },
                chain: nwKey,
                chainMetadata: {
                  label: nwConfig.label,
                  logo: nwConfig.logo ?? null,
                  explorer: nwConfig.explorer ?? null,
                  test: nwConfig.test ?? null,
                },
                address,
                ...addressMetadata,
                tokenId,
              }
            }

            return {
              is: isContract
                ? isNFT ? 'nftContract' : 'coinContract'
                : 'account',
              blockchain: bcKey,
              blockchainMetadata: {
                label: bcConfig.label,
                logo: bcConfig.logo ?? null,
              },
              chain: nwKey,
              chainMetadata: {
                label: nwConfig.label,
                logo: nwConfig.logo ?? null,
                explorer: nwConfig.explorer ?? null,
                test: nwConfig.test ?? null,
              },
              address,
              ...addressMetadata,
            }
          }

          return {
            is: undefined,
            blockchain: bcKey,
            blockchainMetadata: {
              label: bcConfig.label,
              logo: bcConfig.logo ?? null,
            },
            chain: nwKey,
            chainMetadata: {
              label: nwConfig.label,
              logo: nwConfig.logo ?? null,
              explorer: nwConfig.explorer ?? null,
              test: nwConfig.test ?? null,
            },
          }
        }
      }

      return {
        is: undefined,
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
