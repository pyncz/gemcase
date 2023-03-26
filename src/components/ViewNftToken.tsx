import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify-icon/react'
import openIcon from '@iconify/icons-ion/open-outline'
import classNames from 'classnames'
import { LayoutSide } from '../layouts'
import type { NftTokenMetadata, Paginated, TokenData } from '../models'
import { formatTokenName, getAbsoluteBaseUrl, trpc } from '../utils'
import { AddressPathRepresentation, AddressRepresentation, ChainRepresentation, NftContractRepresentation } from './representations'
import { HeadMeta } from './HeadMeta'
import { ButtonLink, Markdown, Skeleton, Tag } from './ui'
import { ViewPort } from './ViewPort'
import { ShareButton } from './share'
import { Attribute } from './Attribute'
import { Trait } from './trait/Trait'
import { Profile } from './Profile'
import { ExplorerLink } from './ExplorerLink'
import { Fetcher } from './utils'
import { NftTokenCard } from './NftTokenCard'

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
  } = trpc.nftToken.getMetadata.useQuery({ blockchain, chain, address, tokenId })

  const { name: collectionName, metadata: tokenMetadata } = metadata ?? {}
  const { name: tokenName } = tokenMetadata ?? {}

  const name = formatTokenName(tokenId, tokenName, collectionName)

  const hashtags = useMemo(() => {
    const tags = ['web3', 'NFT', 'token', 'crypto']
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
            <Profile.Header
              cover={metadata?.metadata?.image}
              avatar={metadata?.metadata?.image}
              label={name}
            />

            <Profile.Body>
              <Profile.Summary
                heading={
                  <Skeleton.Element width={140}>
                    {name}
                  </Skeleton.Element>
                }
              >
                {/* Collection */}
                <Link className="tw-link tw-link-regular" href={`/view/${blockchain}/${chain}/${address}`}>
                  <NftContractRepresentation className="tw-text-sm" metadata={metadata} />
                </Link>
              </Profile.Summary>

              <Profile.Actions>
                {/* TODO: Add like / bookmark buttons */}
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
                  ? <ExplorerLink
                      explorer={chainMetadata.explorer}
                      getHref={resolver => resolver.nftToken({
                        address,
                        tokenId,
                      })}
                    />
                  : null
                }
                <ShareButton
                  url={`/view/${blockchain}/${chain}/${address}/${tokenId}`}
                  message={i18n.t('shareMessage.nftToken', {
                    name: tokenMetadata?.name ?? standard,
                  })}
                  hashtags={hashtags}
                />
              </Profile.Actions>

              <Profile.Attributes>
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

                {/* Address */}
                <Attribute label={i18n.t('address')}>
                  <AddressRepresentation className="tw-text-sm" {...props} />
                </Attribute>

                {/* Type of the token */}
                {standard
                  ? (
                    <Attribute label={i18n.t('standard')} textValue={standard}>
                      <Tag className="tw-font-mono">{standard}</Tag>
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

                {/* TODO: Add stats, e.g. last price etc */}
              </Profile.Attributes>

              {/* Description */}
              {isLoading || tokenMetadata?.description
                ? (
                  <div className="tw-flex tw-flex-col tw-items-center tw-flex-nowrap tw-gap-2">
                    <Skeleton.Element width={60} className="tw-h-5">
                      {tokenMetadata?.description
                        ? <h5>{i18n.t('about')}</h5>
                        : null
                      }
                    </Skeleton.Element>
                    <Skeleton.Element width={280} height={200}>
                      {tokenMetadata?.description
                        ? <Markdown
                            className="tw-text-ellipsis tw-max-w-md tw-mx-auto tw-overflow-hidden tw-text-sm tw-text-dim-1"
                            content={tokenMetadata.description}
                          />
                        : null
                      }
                    </Skeleton.Element>
                  </div>
                  )
                : null
              }
            </Profile.Body>
          </>
        }
        >
          <ViewPort
            className="tw-group/viewport"
            overlay={
              <div className="tw-opacity-muted tw-duration-normal group-hover/viewport:tw-opacity-soft tw-flex tw-items-center tw-justify-between tw-gap-3 tw-p-6">
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

          <Fetcher<Paginated<NftTokenMetadata>>
            query={() => trpc.nftContract.getTokens.useQuery(
              { blockchain, chain, address },
            )}
            render={(pages, isLoading) => (
              isLoading || pages?.result.length
                ? (
                  <div className="tw-overflow-hidden tw-py-container tw-px-container">
                    <h3>{i18n.t('tokens.otherFromCollection')}</h3>

                    {isLoading
                      ? (
                        <div className="tw-flex tw-flex-nowrap tw-gap-cards">
                          <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card tw-min-w-card" />
                          <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card tw-min-w-card" />
                          <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card tw-min-w-card" />
                          <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card tw-min-w-card" />
                        </div>
                        )
                      : (
                        <div className="tw-relative">
                          <div className={classNames(
                            'tw-flex tw-pointer-events-none tw-flex-nowrap tw-gap-cards tw-pb-[2rem] md:tw-pb-0',
                            'tw-mask-linear tw-mask-dir-to-t md:tw-mask-dir-to-l tw-mask-from-0 tw-mask-via-[0.04] tw-mask-to-muted tw-mask-point-via-[4rem] md:tw-mask-point-via-[10rem] lg:tw-mask-point-via-[20%]',
                          )}
                          >
                            {pages?.result.map(token => (
                              <NftTokenCard
                                className="tw-min-w-card"
                                key={token.tokenId}
                                blockchain={blockchain}
                                chain={chain}
                                {...token}
                              />
                            ))}
                          </div>

                          <div className="tw-absolute tw-flex-center tw-px-2 tw-py-4 tw-w-full md:tw-w-[10rem] lg:tw-w-[20%] tw-bottom-0 md:tw-right-0 md:tw-bottom-1/2 md:tw-translate-y-1/2">
                            <ButtonLink
                              className="tw-w-full sm:tw-w-auto tw-link tw-link-regular"
                              href={`/view/${blockchain}/${chain}/${address}`}
                            >
                              {i18n.t('view')}
                            </ButtonLink>
                          </div>
                        </div>
                        )
                    }
                  </div>
                  )
                : null // don't render the section at all if there's no data
            )}
          />
        </LayoutSide>
      </Skeleton.Root>
    </>
  )
}
