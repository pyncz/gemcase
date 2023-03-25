import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import Link from 'next/link'
import type { AddressData, NftTokenMetadata } from '../models'
import { formatAddress, getAbsoluteBaseUrl, trpc } from '../utils'
import { LayoutSide } from '../layouts'
import { AddressRepresentation, ChainRepresentation } from './representations'
import { HeadMeta } from './HeadMeta'
import { Profile } from './Profile'
import { ExplorerLink } from './ExplorerLink'
import { ShareButton } from './share'
import { Attribute } from './Attribute'
import { InfiniteList } from './utils'
import { NftTokenCard } from './NftTokenCard'

type Props = AddressData

const hashtags = ['web3', 'crypto']

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
          address: formatAddress(address),
          chain: chainMetadata.label,
        })}
        description={i18n.t('pages.viewAccount.description', {
          address,
          blockchain: blockchainMetadata.label,
          chain: chainMetadata.label,
        })}
        image={ogImage}
      />

      <LayoutSide details={
        <>
          <Profile.Header />
          {/* TODO: Show bio / links when auth is shipped */}

          <Profile.Body>
            <Profile.Summary
              heading={<AddressRepresentation {...props} />}
            />

            <Profile.Actions>
              {chainMetadata.explorer
                ? <ExplorerLink
                    explorer={chainMetadata.explorer}
                    getHref={resolver => resolver.address({
                      address,
                    })}
                  />
                : null
              }
              <ShareButton
                url={`/view/${blockchain}/${chain}/${address}`}
                message={i18n.t('shareMessage.account')}
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
            </Profile.Attributes>

            {/* TODO: Show info about other connected accounts when auth is shipped */}
          </Profile.Body>
        </>
      }
      >
        <InfiniteList<NftTokenMetadata>
          containerClassName="tw-cards-grid"
          query={() => trpc.account.getTokens.useInfiniteQuery(
            { blockchain, chain, address },
            { getNextPageParam: lastPage => lastPage.cursor },
          )}
          render={token => (
            <NftTokenCard
              key={token.tokenId}
              blockchain={blockchain}
              chain={chain}
              {...token}
            >
              {/* Collection */}
              <Link
                className="tw-opacity-muted tw-link tw-link-regular tw-text-xs tw-truncate tw-max-w-full"
                href={`/view/${blockchain}/${chain}/${token.address}`}
              >
                {token.name}
              </Link>
            </NftTokenCard>
          )}
        />
      </LayoutSide>
    </>
  )
}
