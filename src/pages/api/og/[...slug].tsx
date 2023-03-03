import type { Nullable } from '@voire/type-utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AddressInfo, TokenInfo } from '../../../models'
import { adapter, generateOpengraphImage, getValidWeb3Params } from '../../../services'
import { formatAddress, getParamsArray } from '../../../utils'

const getOgpengraphImageByConfig = async (config: any): Promise<Nullable<Buffer>> => {
  // NFT
  if (config.tokenId) {
    const { blockchain, chainId, address, tokenId } = config as TokenInfo
    const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
    if (bcConfig && bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)) {
      const metadata = await bcConfig.getNftTokenMetadata(
        chainId,
        address,
        tokenId,
      )
      if (metadata) {
        // TODO: meta: Add `metadata.metadata?.image` to the og image
        return await generateOpengraphImage({
          title: metadata.name,
          description:
            metadata.metadata?.description ?? `View ${metadata.symbol} #${+tokenId} on gemcase`,
        })
      }
    }
  }

  // Address
  if (config.address) {
    const { blockchain, chainId, address, isContract, isNFT, standard } = config as AddressInfo
    const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
    if (bcConfig && bcConfig.validateChainById(chainId) && bcConfig.validateAddress(address)) {
      if (isContract) {
        if (isNFT) {
          // NFT Contract Address
          const metadata = await bcConfig.getNftContractMetadata(
            chainId,
            address,
          )
          if (metadata) {
            return await generateOpengraphImage({
              title: metadata.name,
              description: `View ${metadata.symbol} ${standard ?? 'NFT'} Contract on gemcase`,
            })
          }
        } else {
          // Coin Contract Address
          const metadata = await bcConfig.getCoinContractMetadata(
            chainId,
            address,
          )
          if (metadata) {
            // TODO: meta: Add `metadata.logo` to the og image
            return await generateOpengraphImage({
              title: metadata.name,
              description: standard
                ? `View ${metadata.symbol} ${standard} Contract on gemcase`
                : `View ${metadata.symbol} Contract on gemcase`,
            })
          }
        }
      } else {
        // A regular address
        return await generateOpengraphImage({
          title: formatAddress(address),
          description: 'View address on gemcase',
        })
      }
    }
  }

  return null
}

const genOpengraphImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  const slugParams = getParamsArray(slug)

  const pageConfig = await getValidWeb3Params(slugParams)
  if (pageConfig) {
    try {
      const buffer = await getOgpengraphImageByConfig(pageConfig)

      if (buffer) {
        res.setHeader('Content-Type', 'image/png')
        res.send(buffer)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      res.status(500).send('Failed to generate the image')
    }
  }

  res.status(404).send('Not Found')
}

export default genOpengraphImage
