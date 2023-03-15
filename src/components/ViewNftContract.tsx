import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { LayoutSide } from '../layouts'
import type { AddressData } from '../models'
import { getAbsoluteBaseUrl, stringify, trpcHooks } from '../utils'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { HeadMeta } from './HeadMeta'

type Props = AddressData

export const ViewNftContract: FC<Props> = (props) => {
  const {
    isCollectibleNFT,
    blockchain,
    chain,
    chainMetadata,
    address,
    standard,
  } = props

  const { i18n } = useTranslation()

  const {
    isLoading,
    data: metadata,
  } = trpcHooks.metadata.getNftContractMetadata.useQuery({ blockchain, chain, address })

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewNftContract.title', {
          name: metadata ? `${metadata.name} - ${standard}` : standard,
        })}
        description={i18n.t('pages.viewNftContract.description', {
          name: metadata ? `${metadata.name} (${metadata.symbol}) ${standard}` : standard,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <LayoutSide>
        <h1>An NFT address</h1>
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
