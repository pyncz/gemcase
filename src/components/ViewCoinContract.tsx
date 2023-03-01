import type { FC } from 'react'
import Image from 'next/image'
import { LayoutSide } from '../layouts'
import type { AddressInfo } from '../models'
import { trpc } from '../utils'
import { AddressRepresentation } from './AddressRepresentation'
import { Skeleton, Tag } from './ui'

interface Props extends AddressInfo {
  standard?: string
}

export const ViewCoinContract: FC<Props> = (props) => {
  const {
    blockchain,
    chainId,
    address,
    standard,
  } = props

  const {
    isLoading,
    data: metadata,
  } = trpc.metadata.getCoinContractMetadata.useQuery({ blockchain, chainId, address })

  const logoSize = 64

  return (
    <LayoutSide>
      <Skeleton.Root loaded={!isLoading}>
        <section className="tw-px-container tw-py-section tw-space-y-title">
          <div className="tw-space-y-2">
            <h1 className="tw-mb-1 tw-relative tw-top-2">
              <Skeleton.Element width="4ch">
                <span className="tw-relative tw--top-2 tw-inline-flex tw-pb-1">{metadata?.name}</span>
              </Skeleton.Element>
              {standard
                ? <Tag className="tw-text-3/4 tw-relative tw--top-2 tw-left-[0.75ch]">{standard}</Tag>
                : null
              }
            </h1>
            <div>
              <AddressRepresentation {...props} />
            </div>
          </div>

          <div className="tw-text-dim-1 tw-flex tw-gap-4 tw-items-center tw-pb-4 tw-border-b tw-border-separator-muted">
            <div className="tw-rounded-full tw-overflow-hidden tw-inline-flex tw--mx-1">
              <Skeleton.Element width={logoSize} height={logoSize}>
                {metadata?.logo ? <Image src={metadata.logo} alt={metadata.name} width={logoSize} height={logoSize} /> : null}
              </Skeleton.Element>
            </div>

            <div className="tw-flex-1">
              <h3 className="tw-mb-0 tw-flex">
                <Skeleton.Element width={120}>
                  {metadata?.symbol}
                </Skeleton.Element>
              </h3>
              <small className="tw-text-dim-2">
                <Skeleton.Element width={100}>
                  {'usd rate?'}
                </Skeleton.Element>
              </small>
            </div>
          </div>
        </section>
      </Skeleton.Root>
    </LayoutSide>
  )
}
