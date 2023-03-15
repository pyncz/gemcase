import type { Nullable } from '@voire/type-utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Web3Data } from '../../../models'
import { adapter } from '../../../services/web3'
import { getValidWeb3Data } from '../../../services/getValidWeb3Data'
import { generateOpengraphImage } from '../../../services/generateOgImage'
import { formatAddress, getParamsArray } from '../../../utils'

const getOgpengraphImageByConfig = async (config: Web3Data): Promise<Nullable<Buffer>> => {
  const { is } = config

  // NFT
  if (is === 'nft') {
    const { blockchain, chain, address, tokenId } = config
    const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
    if (bcConfig && bcConfig.validateAddress(address)) {
      const metadata = await bcConfig.getNftTokenMetadata(chain, address, tokenId)

      if (metadata) {
        // Show the NFT image as the og-image for this token
        if (metadata.metadata) {
          // A *significantly big* file may be stored on ipfs (or anywhere)
          // so we'll come up with just a regular preview as a fallback
          try {
            const tokenImageRes = await fetch(metadata.metadata.image)
            const tokenImage = await tokenImageRes.arrayBuffer()
            return Buffer.from(tokenImage)
          } catch (e) {}
        } // -> fallback down to a regular template image

        return await generateOpengraphImage({
          title: metadata.metadata?.name ?? metadata.name,
          description: `View ${metadata.name} #${+tokenId} on gemcase`,
        })
      } // -> fallback down to NFT Contract Address if there's no metadata
    }
  }

  // Address
  if (is) {
    const { blockchain, chain, address, standard } = config
    const [_bc, bcConfig] = adapter.findBlockchain(blockchain) ?? []
    if (bcConfig && bcConfig.validateAddress(address)) {
      // NFT Contract Address
      if (['nftContract', 'nft'].includes(is)) {
        const metadata = await bcConfig.getNftContractMetadata(chain, address)

        if (metadata) {
          return await generateOpengraphImage({
            title: metadata.name,
            description: `View ${metadata.symbol} ${standard ?? 'NFT'} Contract on gemcase`,
          })
        } // -> fallback down to a regular address if there's no metadata
      }

      // Coin Contract Address
      if (is === 'coinContract') {
        const metadata = await bcConfig.getCoinContractMetadata(chain, address)

        if (metadata) {
          // TODO: meta: Add `metadata.logo` to the og image
          return await generateOpengraphImage({
            title: metadata.name,
            description: standard
              ? `View ${metadata.symbol} ${standard} Contract on gemcase`
              : `View ${metadata.symbol} Contract on gemcase`,
          })
        } // -> fallback down to a regular address if there's no metadata
      }

      // A regular address
      return await generateOpengraphImage({
        title: formatAddress(address),
        description: `View ${blockchain} address on gemcase`,
      })
    }
  }

  return null
}

const genOpengraphImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  const slugParams = getParamsArray(slug)

  const requestWeb3Data = await getValidWeb3Data(...slugParams)
  if (requestWeb3Data) {
    try {
      const buffer = await getOgpengraphImageByConfig(requestWeb3Data)

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
