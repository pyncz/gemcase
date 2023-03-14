import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { LayoutSide } from '../layouts'
import type { AddressData } from '../models'
import { getAbsoluteBaseUrl, trpcHooks } from '../utils'
import { HeadMeta } from './HeadMeta'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { Skeleton, Tag } from './ui'
import { CoinContractRepresentation } from './representations'

type Props = AddressData

export const ViewCoinContract: FC<Props> = (props) => {
  const {
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
  } = trpcHooks.metadata.getCoinContractMetadata.useQuery({ blockchain, chain, address })

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewCoinContract.title', {
          name: metadata ? `${metadata.name} - ${standard}` : standard,
        })}
        description={i18n.t('pages.viewCoinContract.description', {
          name: metadata ? `${metadata.symbol} ${standard}` : standard,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <LayoutSide>
        <Skeleton.Root loaded={!isLoading}>
          <section className="tw-px-container tw-py-section tw-space-y-title">
            <div className="tw-space-y-2">
              <h1 className="tw-mb-1 tw-relative tw-top-2">
                <Skeleton.Element width="4ch">
                  <span className="tw-relative tw--top-2 tw-inline-flex tw-pb-1">{metadata?.name}</span>
                </Skeleton.Element>
                {standard
                  ? (<>{' '}<Tag className="tw-text-3/4 tw-relative tw--top-2">{standard}</Tag></>)
                  : null
                }
              </h1>
              <div>
                <AddressPathRepresentation {...props} />
              </div>
            </div>

            <div className="tw-flex tw-pb-4 tw-border-b tw-border-separator-muted">
              <CoinContractRepresentation
                metadata={metadata}
                imageSize="xl"
                className="tw-text-lg tw-text-dim-1"
              >
                <h3 className="tw-mb-0 tw-flex">
                  {metadata?.symbol}
                </h3>
              </CoinContractRepresentation>
            </div>
          </section>
        </Skeleton.Root>
      </LayoutSide>
    </>
  )
}
