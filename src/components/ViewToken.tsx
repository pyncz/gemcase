import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { LayoutSide } from '../layouts'
import type { AddressData } from '../models'
import { getAbsoluteBaseUrl, trpcHooks } from '../utils'
import { HeadMeta } from './HeadMeta'
import { AddressPathRepresentation } from './representations/AddressPathRepresentation'
import { Skeleton, Tag } from './ui'
import { ChainRepresentation, CoinContractRepresentation } from './representations'
import { Profile } from './Profile'
import { ExplorerLink } from './ExplorerLink'
import { ShareButton } from './share'
import { Attribute } from './Attribute'

type Props = AddressData

export const ViewToken: FC<Props> = (props) => {
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

  const hashtags = useMemo(() => {
    const tags = ['coin', 'token', 'crypto', 'cryptocurrency']
    if (metadata) {
      tags.push(metadata.symbol)
    }
    return tags
  }, [metadata])

  const ogImage = `${getAbsoluteBaseUrl()}/api/og/${blockchain}/${chain}/${address}`

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.viewToken.title', {
          name: metadata ? `${metadata.name} - ${standard}` : standard,
        })}
        description={i18n.t('pages.viewToken.description', {
          name: metadata ? `${metadata.symbol} ${standard}` : standard,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <Skeleton.Root loaded={!isLoading}>
        <LayoutSide
          details={
            <>
              <Profile.Header
                blur={6}
                cover={metadata?.logo}
                avatar={metadata?.logo}
                avatarShape="circle"
                alt={metadata?.name}
              />

              <Profile.Body>
                <Profile.Summary
                  heading={
                    <Skeleton.Element width="4ch">
                      {metadata?.symbol ?? null}
                    </Skeleton.Element>
                  }
                >
                  <Skeleton.Element width="6ch">
                    {metadata?.name
                      ? <span className="tw-text-sm tw-text-dim-2">{metadata.name}</span>
                      : null
                    }
                  </Skeleton.Element>
                </Profile.Summary>

                <Profile.Actions>
                  {/* TODO: Add like / bookmark buttons */}
                  {chainMetadata.explorer
                    ? <ExplorerLink
                        explorer={chainMetadata.explorer}
                        getHref={resolver => resolver.token({
                          address,
                        })}
                      />
                    : null
                  }
                  <ShareButton
                    url={`/view/${blockchain}/${chain}/${address}`}
                    message={i18n.t('shareMessage.token', {
                      name: metadata?.name ?? standard,
                    })}
                    hashtags={hashtags}
                  />
                </Profile.Actions>

                <Profile.Attributes>
                  <Attribute label={i18n.t('chain')} textValue={chainMetadata.label}>
                    <ChainRepresentation
                      className="tw-overflow-hidden tw-text-sm"
                      {...chainMetadata}
                    />
                  </Attribute>

                  {standard
                    ? (
                      <Attribute label={i18n.t('standard')} textValue={standard}>
                        <Tag>{standard}</Tag>
                      </Attribute>
                      )
                    : null
                  }
                </Profile.Attributes>
              </Profile.Body>
            </>
          }
        >
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
                imageSize="lg"
                className="tw-text-lg tw-text-dim-1"
              >
                <h3 className="tw-mb-0 tw-flex">
                  {metadata?.symbol}
                </h3>
              </CoinContractRepresentation>
            </div>
          </section>
        </LayoutSide>
      </Skeleton.Root>
    </>
  )
}
