import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useMemo } from 'react'
import { LayoutSide } from '../layouts'
import type { AddressData, NftTokenMetadata } from '../models'
import { getAbsoluteBaseUrl, trpc } from '../utils'
import { HeadMeta } from './HeadMeta'
import { Skeleton, Tag } from './ui'
import { Profile } from './Profile'
import { ExplorerLink } from './ExplorerLink'
import { ShareButton } from './share'
import { Attribute } from './Attribute'
import { AddressRepresentation, ChainRepresentation } from './representations'
import { NftTokenCard } from './NftTokenCard'
import { InfiniteList } from './utils'

type Props = AddressData

export const ViewNftContract: FC<Props> = (props) => {
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
  } = trpc.nftContract.getMetadata.useQuery({ blockchain, chain, address })

  const hashtags = useMemo(() => {
    const tags = ['web3', 'NFT', 'token', 'crypto']
    if (metadata) {
      tags.push(metadata.symbol, metadata.name)
    }
    return tags
  }, [metadata])

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

      <Skeleton.Root loaded={!isLoading}>
        <LayoutSide details={
          <>
            <Profile.Header label={metadata?.name} />

            <Profile.Body>
              <Profile.Summary
                heading={
                  <Skeleton.Element width={120}>
                    {metadata?.name}
                  </Skeleton.Element>
                }
              />

              <Profile.Actions>
                {chainMetadata.explorer
                  ? <ExplorerLink
                      explorer={chainMetadata.explorer}
                      getHref={resolver => resolver.nftContract({
                        address,
                      })}
                    />
                  : null
                }
                <ShareButton
                  url={`/view/${blockchain}/${chain}/${address}`}
                  message={i18n.t('shareMessage.nftContract', {
                    name: metadata?.name ?? standard,
                  })}
                  hashtags={hashtags}
                />
              </Profile.Actions>

              <Profile.Attributes>
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

                {/* TODO: Add stats, e.g. total supply, floor price etc */}
              </Profile.Attributes>

              {/* TODO: Fetch descriotion too (use Alchemy instead of / along with Moralis?) */}
            </Profile.Body>
          </>
        }
        >
          <InfiniteList<NftTokenMetadata>
            className="tw-min-h-viewport tw-px-container tw-py-container"
            query={() => trpc.nftContract.getTokens.useInfiniteQuery(
              { blockchain, chain, address },
              { getNextPageParam: lastPage => lastPage.cursor },
            )}
            renderData={pages => (
              <div className="tw-cards-grid">
                {pages.map(page => page.result.map(token => (
                  <NftTokenCard
                    key={token.tokenId}
                    blockchain={blockchain}
                    chain={chain}
                    {...token}
                  />
                )))}
              </div>
            )}
            placeholder={
              <div className="tw-cards-grid">
                <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card" />
                <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card" />
                <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card" />
                <Skeleton.Placeholder className="tw-rounded-lg tw-min-h-card" />
              </div>
            }
            fallback={
              <div className="tw-h-full tw-flex-center tw-text-dim-2">
                <p>{i18n.t('fallback.noTokens')}</p>
              </div>
            }
          />
        </LayoutSide>
      </Skeleton.Root>
    </>
  )
}
