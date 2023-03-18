import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify-icon/react'
import openIcon from '@iconify/icons-ion/open-outline'
import shareIcon from '@iconify/icons-ion/share-outline'
import explorerIcon from '@iconify/icons-ion/information-circle-outline'
import { LayoutSide } from '../layouts'
import type { TokenData } from '../models'
import { formatTokenName, getAbsoluteBaseUrl, trpcHooks } from '../utils'
import { exploreAdapter } from '../services/exploreAdapter'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { HeadMeta } from './HeadMeta'
import { Button, ButtonLink, Markdown, Skeleton, Tag } from './ui'
import { ProfileHeader } from './ProfileHeader'
import { ChainRepresentation, NftContractRepresentation } from './representations'
import { ViewPort } from './ViewPort'
import { SharePopup } from './share'
import { Attribute } from './Attribute'
import { Trait } from './trait/Trait'

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

            <div className="tw-px-6 tw-pt-2 tw-pb-10 tw-space-y-fields tw-text-center">
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
              <div className="tw-flex tw-flex-col xs:tw-grid xs:tw-grid-cols-[repeat(auto-fit,minmax(0,1fr))] tw-gap-2.5">
                {tokenMetadata?.externalUrl
                  ? <ButtonLink
                      title={i18n.t('externalUrl')}
                      targetBlank
                      href={tokenMetadata.externalUrl}
                      appearance="secondary"
                      icon={<Icon icon={openIcon} />}
                    />
                  : null
                }
                {chainMetadata.explorer
                  ? <ButtonLink
                      title={i18n.t('viewOn', { name: chainMetadata.explorer.label })}
                      targetBlank
                      href={exploreAdapter[chainMetadata.explorer.resolver].nftToken({
                        address,
                        tokenId,
                      })}
                      appearance="secondary"
                      icon={<Icon icon={explorerIcon} />}
                    />
                  : null
                }
                <SharePopup
                  message={i18n.t('shareMessage.nftToken', {
                    name: tokenMetadata?.name ?? standard,
                  })}
                  hashtags={hashtags}
                  url={`/view/${blockchain}/${chain}/${address}/${tokenId}`}
                >
                  <Button
                    title={i18n.t('share')}
                    className="tw-w-auto"
                    icon={<Icon icon={shareIcon} />}
                  />
                </SharePopup>
              </div>

              <div className="tw-space-y-fields tw-py-4">
                {/* Amount (for collectible) */}
                {isCollectibleNFT
                  ? (
                    <Attribute label={i18n.t('amount')}>
                      <Skeleton.Element width={90}>
                        {metadata?.amount}
                      </Skeleton.Element>
                    </Attribute>
                    )
                  : null
                }

                {/* Network */}
                <Attribute label={i18n.t('chain')} textValue={chainMetadata.label}>
                  <ChainRepresentation
                    className="tw-overflow-hidden tw-text-sm"
                    {...chainMetadata}
                  />
                </Attribute>

                {/* Type of the token */}
                {standard
                  ? (
                    <Attribute label={i18n.t('standard')} textValue={standard}>
                      <Tag>{standard}</Tag>
                    </Attribute>
                    )
                  : null
                }

                {tokenMetadata?.attributes?.length
                  ? tokenMetadata.attributes.map((trait, index) => (
                    <Trait key={index} trait={trait} />
                  ))
                  : null
                }
              </div>

              <Skeleton.Element width={280} height={200}>
                {tokenMetadata?.description
                  ? <>
                    <h5>{i18n.t('about')}</h5>
                    <Markdown
                      className="tw-text-ellipsis tw-max-w-md tw-mx-auto tw-overflow-hidden tw-text-sm tw-text-dim-1"
                      content={tokenMetadata.description}
                    />
                  </>
                  : null
                }
              </Skeleton.Element>
            </div>
            {/* TODO: Add stats, e.g. floor price, etc */}
          </>
        }
        >
          <ViewPort
            className="tw-group/viewport"
            overlay={
              <div className="tw-opacity-muted tw-duration-normal group-hover/viewport:tw-opacity-full tw-flex tw-items-center tw-justify-between tw-gap-3 tw-p-6">
                <div className="tw-inline-block tw-px-2">
                  <AddressPathRepresentation {...props} />
                </div>

                <Skeleton.Element size={32} className="tw-rounded">
                  {tokenMetadata?.image
                    ? <ButtonLink
                        title={i18n.t('openOriginal')}
                        targetBlank
                        href={tokenMetadata.image}
                        appearance="secondary"
                        icon={<Icon icon={openIcon} />}
                      />
                    : null
                }
                </Skeleton.Element>
              </div>
            }
          >
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
