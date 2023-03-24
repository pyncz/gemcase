import Image from 'next/image'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import type { AvatarShape } from '../../models'

interface Props {
  src: string
  label?: string
  size?: number
  shape?: AvatarShape
  offset?: number
}

export const Avatar: FC<Props> = (props) => {
  const {
    src,
    label,
    shape = 'square',
    offset = 2,
    size = 32,
  } = props

  const avatarOuterRadius = shape === 'square'
    ? `${Math.round(size / 8) + offset}px`
    : '100%'
  const avatarInnerRadius = shape === 'square'
    ? `${Math.round(size / 8)}px`
    : '100%'

  const { i18n } = useTranslation()

  const alt = label
    ? i18n.t('avatarOf', { name: label })
    : i18n.t('avatar')

  return (
    <div
      className="tw-absolute tw-bottom-0 tw-left-1/2 tw--translate-x-1/2 tw-bg-base"
      style={{
        padding: `${offset}px`,
        borderRadius: avatarOuterRadius,
      }}
    >
      {/* TODO: Provide placeholder="blur" & blurDataUrl */}
      <Image
        className="tw-object-cover tw-border-avatar tw-bg-viewport"
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          borderRadius: avatarInnerRadius,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  )
}
