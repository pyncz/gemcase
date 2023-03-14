import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { LayoutSide } from '../layouts'
import type { TokenData } from '../models'
import { getAbsoluteBaseUrl, stringify, trpcHooks } from '../utils'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { HeadMeta } from './HeadMeta'

type Props = TokenData

export const ViewNftToken: FC<Props> = (props) => {
  const {
    isCollectibleNFT,
    blockchain,
    chain,
    chainMetadata,
    address,
    tokenId,
    standard,
  } = props

  const { i18n } = useTranslation()

  const {
    isLoading,
    data: metadata,
  } = trpcHooks.metadata.getNftTokenMetadata.useQuery({ blockchain, chain, address, tokenId })

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}/${tokenId}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewNftToken.title', {
          name: metadata
            ? `${metadata.name} #${tokenId} - ${standard}`
            : `#${tokenId} - ${standard}`,
        })}
        description={i18n.t('pages.viewNftToken.description', {
          name: metadata ? `${metadata.symbol} ${standard}` : standard,
          tokenId,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <LayoutSide>
        <h1>An NFT address</h1>
        <h2>Token ID #{tokenId}</h2>
        {isCollectibleNFT ? <small>collectible</small> : null}
        <AddressPathRepresentation {...props} />

        {isLoading
          ? <div>Loading...</div>
          : <code>{stringify(metadata)}</code>
        }
      </LayoutSide>
    </>
  )
}
