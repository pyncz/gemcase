import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import type { AddressData } from '../models'
import { getAbsoluteBaseUrl } from '../utils'
import { AddressPathRepresentation } from './representations'
import { HeadMeta } from './HeadMeta'

type Props = AddressData

export const ViewAccount: FC<Props> = (props) => {
  const {
    blockchain,
    blockchainMetadata,
    chain,
    chainMetadata,
    address,
  } = props

  const { i18n } = useTranslation()

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewAccount.title', {
          address,
          chain: chainMetadata.label,
        })}
        description={i18n.t('pages.viewAccount.description', {
          address,
          blockchain: blockchainMetadata.label,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <div>
        <h1>Just a regular address</h1>
        <AddressPathRepresentation {...props} />
        {/* TODO: Show related NFT owned by the address? */}
      </div>
    </>
  )
}
