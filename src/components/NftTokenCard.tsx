import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import type { AddressPath, NftTokenMetadata, WithClassName } from '../models'
import { formatTokenName } from '../utils'

type Props = NftTokenMetadata & AddressPath

export const NftTokenCard: FC<PropsWithChildren<WithClassName<Props>>> = (props) => {
  const { blockchain, chain, address, tokenId, className, children } = props

  const { i18n } = useTranslation()

  const tokenName = formatTokenName(tokenId, props.metadata?.name, props.name)
  const style = {
    '--e-load-failed': `"${i18n.t('errors.failedToLoad')}"`,
  } as CSSProperties

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
              className={classNames(
                'tw-object-contain tw-text-3/4 tw-rounded tw-overflow-hidden tw-text-dim-3',
                'data-[error]:before:tw-flex-center data-[error]:tw-p-2 data-[error]:tw-rounded data-[error]:before:tw-absolute data-[error]:before:tw-inset-0 data-[error]:before:tw-bg-dim-2 data-[error]:before:tw-content-[var(--e-load-failed)]',
              )}
              fill
              style={style}
              onError={e => e.currentTarget.setAttribute('data-error', '')}
              onLoad={e => e.currentTarget.removeAttribute('data-error')}
            />
          : (
            <div className="tw-absolute tw-inset-0 tw-flex-center tw-p-2 tw-bg-dim-2 tw-text-dim-2">
              #{tokenId}
            </div>
            )
        }
      </Link>

      <p className="tw-line-clamp-2 tw-text-sm" title={tokenName}>
        <span className="tw-font-bold">{props.metadata?.name ?? props.name}</span>{' '}
        <span className="tw-text-dim-2">#{tokenId}</span>
      </p>

      {children}
    </div>
  )
}
