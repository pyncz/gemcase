import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import Image from 'next/image'
import { LayoutSide } from '../layouts'
import type { TokenData } from '../models'
import { formatTokenName, getAbsoluteBaseUrl, trpcHooks } from '../utils'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { HeadMeta } from './HeadMeta'
import { Skeleton } from './ui'
import { ProfileHeader } from './ProfileHeader'
import { NftContractRepresentation } from './representations'
import { ViewPort } from './ViewPort'

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

  const { name: collectionName, metadata: tokenMetadata } = metadata ?? {}
  const { name: tokenName } = tokenMetadata ?? {}

  const name = formatTokenName(tokenId, tokenName, collectionName)

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

      <Skeleton.Root loaded={!isLoading}>
        <LayoutSide details={
          <>
            {/* TODO: Process / resize metadata images with `sharp` on server? */}
            {/* TODO: Generate blurred image to use as ambient background on server. */}

            {/*
              TODO: Update `ProfileHeader` to get it able to render
              `metadata?.metadata?.animationUrl` as a cover (i.e. a video file)
            */}
            <ProfileHeader
              cover={metadata?.metadata?.image}
              avatar={metadata?.metadata?.image}
              alt={name}
            />

            <div className="tw-px-6 tw-py-2 tw-space-y-fields tw-text-center">
              <div>
                {/* Title */}
                <div className="tw-font-bold">
                  <Skeleton.Element width={140}>
                    {name}
                  </Skeleton.Element>
                </div>

                {/* Collection */}
                <NftContractRepresentation metadata={metadata} />
              </div>

              {/* Amount (for collectible) */}
              {isCollectibleNFT
                ? (
                  <Skeleton.Element width={90}>
                    <div>amount: {metadata?.amount}</div>
                  </Skeleton.Element>
                  )
                : null
              }

              {`
              - standard
              - traits {metadata?.metadata?.attributes}
              - site / opensea {metadata?.metadata?.externalUrl}
              - scan link
              - original image link

              - share button?
              - like / bookmark
              `}

              <Skeleton.Element width={280} height={200}>
                {metadata?.metadata?.description ?? null}
              </Skeleton.Element>
            </div>
            {/* TODO: Add stats, e.g. floor price, etc */}
          </>
        }
        >
          <ViewPort>
            <div className="tw-absolute tw--top-10 tw-left-0 tw-z-1">
              <AddressPathRepresentation {...props} />
            </div>

            <Skeleton.Element size={320} className="tw-rounded">
              {metadata?.metadata?.image
                ? <Image
                    className="tw-object-contain"
                    src={metadata.metadata.image}
                    alt={name}
                    fill
                  />
                : null
            }
            </Skeleton.Element>
          </ViewPort>
        </LayoutSide>
      </Skeleton.Root>
    </>
  )
}
