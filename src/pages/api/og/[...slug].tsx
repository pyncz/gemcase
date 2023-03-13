import type { Nullable } from '@voire/type-utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AddressData, TokenData, Web3Data } from '../../../models'
import { adapter } from '../../../services/web3'
import { getValidWeb3Data } from '../../../services/getValidWeb3Data'
import { generateOpengraphImage } from '../../../services/generateOgImage'
import { formatAddress, getParamsArray } from '../../../utils'

const getOgpengraphImageByConfig = async (data: Web3Data): Promise<Nullable<Buffer>> => {
  const config = data as any

  // NFT
  if (config.tokenId) {
    const { blockchain, chain, address, tokenId } = config as TokenData
    const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
    if (bcConfig && bcConfig.validateChain(chain) && bcConfig.validateAddress(address)) {
      const metadata = await bcConfig.getNftTokenMetadata(chain, address, tokenId)

      if (metadata) {
        // Show the NFT image as the og-image for this token
        if (metadata.metadata) {
          // A big file may be stored on ipfs (or anywhere)
          // so we'll generate just a regular preview as a fallback
          try {
            const tokenImageRes = await fetch(metadata.metadata.image)
            const tokenImage = await tokenImageRes.arrayBuffer()
            return Buffer.from(tokenImage)
          } catch (e) {}
        }

        return await generateOpengraphImage({
          title: metadata.name,
          description: `View ${metadata.symbol} #${+tokenId} on gemcase`,
        })
      }
    }
  }

  // Address
  if (config.address) {
    const { blockchain, chain, address, isContract, isNFT, standard } = config as AddressData
    const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
    if (bcConfig && bcConfig.validateChain(chain) && bcConfig.validateAddress(address)) {
      if (isContract) {
        if (isNFT) {
          // NFT Contract Address
          const metadata = await bcConfig.getNftContractMetadata(chain, address)

          if (metadata) {
            return await generateOpengraphImage({
              title: metadata.name,
              description: `View ${metadata.symbol} ${standard ?? 'NFT'} Contract on gemcase`,
            })
          }
        } else {
          // Coin Contract Address
          const metadata = await bcConfig.getCoinContractMetadata(chain, address)

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

  const pageConfig = await getValidWeb3Data(...slugParams)
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
