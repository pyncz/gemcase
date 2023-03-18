import classNames from 'classnames'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import type { ChainMetadata, WithClassName } from '../../models'
import { Representation, RepresentationImage } from './base'

export const ChainRepresentation: FC<WithClassName<ChainMetadata>> = (props) => {
  const { label, logo, className } = props

  const { i18n } = useTranslation()

  return (
    <Representation
      title={i18n.t('chainName', { name: label })}
      className={classNames('tw-font-mono', className)}
      label={label}
      image={logo
        ? <RepresentationImage alt={label} image={logo} size="xs" />
        : null
      }
    />
  )
}
