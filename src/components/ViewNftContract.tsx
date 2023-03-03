import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { LayoutSide } from '../layouts'
import type { AddressInfo } from '../models'
import { getAbsoluteBaseUrl, stringify, trpc } from '../utils'
import { AddressRepresentation } from './AddressRepresentation'
import { HeadMeta } from './HeadMeta'

type Props = AddressInfo

export const ViewNftContract: FC<Props> = (props) => {
  const {
    isCollectibleNFT,
    blockchain,
    chain,
    chainId,
    chainMetadata,
    address,
    standard,
  } = props

  const { i18n } = useTranslation()

  const {
    isLoading,
    data: metadata,
  } = trpc.metadata.getNftContractMetadata.useQuery({ blockchain, chainId, address })

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewNftContract.title', {
          name: metadata ? `${metadata.name} - ${standard}` : standard,
        })}
        description={i18n.t('pages.viewNftContract.description', {
          name: metadata ? `${metadata.symbol} ${standard}` : standard,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <LayoutSide>
        <h1>An NFT address</h1>
        {isCollectibleNFT ? <small>collectible</small> : null}
        <AddressRepresentation {...props} />

        {isLoading
          ? <div>Loading...</div>
          : <code>{stringify(metadata)}</code>
        }
      </LayoutSide>
    </>
  )
}
