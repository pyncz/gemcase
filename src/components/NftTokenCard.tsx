import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import type { AddressPath, NftTokenMetadata, WithClassName } from '../models'
import { formatTokenName } from '../utils'

type Props = NftTokenMetadata & AddressPath

export const NftTokenCard: FC<WithClassName<Props>> = (props) => {
  const { blockchain, chain, address, tokenId, className } = props

  const tokenName = formatTokenName(tokenId, props.metadata?.name, props.name)

  return (
    <div className={classNames(
      'tw-group/card tw-relative tw-transition-fancy tw-rounded-lg tw-overflow-hidden tw-space-y-2 tw-p-2 tw-border tw-border-separator-muted hover:tw-border-separator before:tw-absolute before:tw-inset-0 hover:before:tw-bg-dim-1 before:tw-duration-slow before:tw-z-muted',
      className,
    )}
    >
      <Link
        href={`/view/${blockchain}/${chain}/${address}/${tokenId}`}
        className="!tw-border-none !tw-relative tw-block tw-rounded tw-overflow-hidden tw-w-full tw-aspect-1 tw-duration-normal hover:tw-scale-[1.02]"
      >
        {props.metadata?.image
          ? <Image
              src={props.metadata.image}
              alt={tokenName}
              className="tw-object-contain"
              fill
            />
          : (
            <div className="tw-w-full tw-h-full tw-flex-center tw-p-2 tw-rounded tw-bg-dim-1 tw-text-dim-2">
              #{tokenId}
            </div>
            )
        }
      </Link>

      <p className="tw-line-clamp-2 tw-text-sm" title={tokenName}>
        <span className="tw-font-bold">{props.metadata?.name ?? props.name}</span>{' '}
        <span className="tw-text-dim-2">#{tokenId}</span>
      </p>
    </div>
  )
}
