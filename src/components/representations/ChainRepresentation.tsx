import classNames from 'classnames'
import type { FC } from 'react'
import type { ChainMetadata, WithClassName } from '../../models'
import { Representation, RepresentationImage } from './base'

export const ChainRepresentation: FC<WithClassName<ChainMetadata>> = (props) => {
  const { label, logo, className } = props

  return (
    <Representation
      className={classNames('tw-font-mono', className)}
      label={label}
      image={logo
        ? <RepresentationImage alt={label} image={logo} size="xs" />
        : null
      }
    />
  )
}