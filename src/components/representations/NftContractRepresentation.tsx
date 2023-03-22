import type { FC, PropsWithChildren } from 'react'
import type { Nullable } from '@voire/type-utils'
import type { NftContractMetadata, WithClassName } from '../../models'
import { Skeleton, Tag } from '../ui'
import { Representation } from './base'

interface Props {
  metadata?: Nullable<NftContractMetadata>
}

export const NftContractRepresentation: FC<PropsWithChildren<WithClassName<Props>>> = (props) => {
  const {
    metadata,
    className,
    children,
  } = props
  const { name, symbol } = metadata ?? {}

  return (
    <Representation className={className}>
      <Skeleton.Element width={120}>
        {children ?? (
          <>
            {name}{' '}
            <Tag className="tw-font-mono">{symbol}</Tag>
          </>
        )}
      </Skeleton.Element>
    </Representation>
  )
}
