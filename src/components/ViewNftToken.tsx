import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify-icon/react'
import openIcon from '@iconify/icons-ion/open-outline'
import shareIcon from '@iconify/icons-ion/share-outline'
import statsIcon from '@iconify/icons-ion/stats-chart'
import { LayoutSide } from '../layouts'
import type { TokenData } from '../models'
import { formatTokenName, getAbsoluteBaseUrl, trpcHooks } from '../utils'
import { exploreAdapter } from '../services/exploreAdapter'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { HeadMeta } from './HeadMeta'
import { Button, ButtonLink, Markdown, Skeleton } from './ui'
import { ProfileHeader } from './ProfileHeader'
import { NftContractRepresentation } from './representations'
import { ViewPort } from './ViewPort'
import { GroupContainer } from './GroupContainer'
import { SharePopup } from './share'

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

  const hashtags = useMemo(() => {
    const tags = ['NFT', 'token']
    if (metadata) {
      tags.push(metadata.symbol, metadata.name)
    }
    return tags
  }, [metadata])

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}/${tokenId}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewNftToken.title', {
          name: metadata
            ? `${tokenMetadata?.name ?? `#${+tokenId}`} - ${metadata.name} - ${standard}`
            : `#${+tokenId} - ${standard}`,
        })}
        description={i18n.t('pages.viewNftToken.description', {
          name: metadata
            ? tokenMetadata
              ? `${tokenMetadata.name} (${metadata.name} #${+tokenId}) ${standard}`
              : `${metadata.name} #${+tokenId} ${standard}`
            : standard,
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

            <div className="tw-px-6 tw-pt-2 tw-pb-10 md:tw-pb-8 tw-space-y-fields tw-text-center">
              {/* Summary */}
              <div className="tw-space-y-2 tw-max-w-[15rem] tw-mx-auto">
                {/* Title */}
                <div className="tw-font-bold">
                  <Skeleton.Element width={140}>
                    {name}
                  </Skeleton.Element>
                </div>

                {/* Collection */}
                <Link className="tw-link tw-link-regular" href={`/view/${blockchain}/${chain}/${address}`}>
                  <NftContractRepresentation className="tw-text-sm" metadata={metadata} />
                </Link>
              </div>

              {/* Actions */}
              {/* TODO: Add like / bookmark buttons */}
              <div className="tw-grid tw-grid-cols-[repeat(3,_1fr)] tw-gap-2.5">
                {tokenMetadata?.externalUrl
                  ? <ButtonLink
                      targetBlank
                      href={tokenMetadata.externalUrl}
                      appearance="secondary"
                      icon={<Icon icon={openIcon} />}
                    />
                  : null
                }
                {chainMetadata.explorer
                  ? <ButtonLink
                      targetBlank
                      href={exploreAdapter[chainMetadata.explorer.resolver].token({
                        address,
                        tokenId,
                      })}
                      appearance="secondary"
                      icon={<Icon icon={statsIcon} />}
                    />
                  : null
                }
                <SharePopup
                  message={i18n.t('share.nftToken', {
                    name: tokenMetadata?.name ?? standard,
                  })}
                  hashtags={hashtags}
                  url={`/view/${blockchain}/${chain}/${address}/${tokenId}`}
                >
                  <Button className="tw-w-auto" icon={<Icon icon={shareIcon} />} />
                </SharePopup>
              </div>

              <GroupContainer>
                {/* Amount (for collectible) */}
                {isCollectibleNFT
                  ? (
                    <Skeleton.Element width={90}>
                      <div>amount: {metadata?.amount}</div>
                    </Skeleton.Element>
                    )
                  : null
                }
                <Skeleton.Element width={90}>
                  {standard
                    ? <div>standard: {standard}</div>
                    : null
                  }
                </Skeleton.Element>
              </GroupContainer>

              {`
              - standard
              - traits {metadata?.metadata?.attributes}
              - original image link
              `}

              <Skeleton.Element width={280} height={200}>
                {tokenMetadata?.description
                  ? <Markdown
                      className="tw-text-ellipsis tw-overflow-hidden tw-text-sm tw-text-dim-1"
                      content={tokenMetadata.description}
                    />
                  : null
                }
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
              {tokenMetadata?.image
                ? <Image
                    className="tw-object-contain"
                    src={tokenMetadata.image}
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
