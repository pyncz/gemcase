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
    <div className={classNames('tw-inline-flex tw-items-center tw-gap-ch', className)}>
      {image
        ? <Image
            className="tw-inline-block"
            src={image}
            alt={label}
            width={logoSize}
            height={logoSize}
          />
        : null
      }
      <span>{children ?? label}</span>
    </div>
  )
}
