import classNames from 'classnames'
import type { FC } from 'react'
import type { BlockchainMetadata, WithClassName } from '../models'
import { Representation } from './base'

export const BlockchainRepresentation: FC<WithClassName<BlockchainMetadata>> = (props) => {
  const { label, logo, className } = props

  return (
    <Representation
      className={classNames('tw-font-mono', className)}
      image={logo}
      label={label}
    />
  )
}
