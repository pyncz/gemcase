import type { FC, PropsWithChildren } from 'react'
import type { Nullable } from '@voire/type-utils'
import type { NftTokenMetadata, TokenPath, WithClassName } from '../../models'
import { Skeleton } from '../ui'
import { Representation, RepresentationImage } from './base'
import { NftContractRepresentation } from './NftContractRepresentation'

interface Props extends TokenPath {
  metadata?: Nullable<NftTokenMetadata>
}

export const NftRepresentation: FC<PropsWithChildren<WithClassName<Props>>> = (props) => {
  const {
    metadata,
    className,
    children,
    tokenId,
  } = props
  const { name, metadata: tokenMetadata } = metadata ?? {}
  const { name: tokenName, image } = tokenMetadata ?? {}

  const label = tokenName ?? `${name ? `${name} ` : ''}#${+tokenId}`

  return (
    <Representation
      className={className}
      description={
        <NftContractRepresentation metadata={metadata} />
      }
      image={
        <Skeleton.Element className="!tw-rounded">
          {image
            ? <RepresentationImage
                image={image}
                alt={label}
                className="tw-rounded tw-border-avatar"
              />
            : null}
        </Skeleton.Element>
      }
    >
      <Skeleton.Element width={140}>
        {children ?? label}
      </Skeleton.Element>
    </Representation>
  )
}
