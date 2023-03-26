import classNames from 'classnames'
import Image from 'next/image'
import type { FC, ReactElement } from 'react'
import type { SizeExtra } from '@voire/type-utils'
import type { WithClassName } from '../../../models'

type Props = {
  image: string
  alt: string
  size?: number | SizeExtra
} | {
  image: ReactElement
  alt?: never
  size?: never
}

export const RepresentationImage: FC<WithClassName<Props>> = (props) => {
  const {
    image,
    alt,
    size,
    className,
  } = props ?? {}

  if (typeof image === 'string') {
    const sizePx = typeof size === 'number'
      ? size
      : {
          xs: 20,
          sm: 24,
          md: 32,
          lg: 48,
          xl: 64,
        }[size ?? 'md']

    return (
      <Image
        className={classNames('tw-object-cover tw-inline-block tw--ml-0.5', className)}
        src={image}
        alt={alt!}
        width={sizePx}
        height={sizePx}
      />
    )
  }

  return image
}
