import type { Nullable } from '@voire/type-utils'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC, PropsWithChildren } from 'react'
import type { WithClassName } from '../../models'

type Props = {
  label: undefined
  image: undefined
} | {
  label: string
  image?: Nullable<string>
}

export const Representation: FC<PropsWithChildren<WithClassName<Props>>> = (props) => {
  const { children, image, label, className } = props

  const logoSize = 20

  return (
    <div className={classNames('tw-flex-center-y tw-gap-ch', className)}>
      {image
        ? <Image
            className="tw-inline-block tw--ml-0.5"
            src={image}
            alt={label}
            width={logoSize}
            height={logoSize}
          />
        : null
      }
      <span className="tw-truncate">{children ?? label}</span>
    </div>
  )
}
