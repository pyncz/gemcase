import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import type { AvatarShape, WithClassName } from '../../models'
import { Skeleton } from '../ui'
import { Avatar } from './Avatar'

interface Props {
  cover?: string
  avatar?: string
  avatarShape?: AvatarShape
  label?: string
  blur?: number
}

export const Header: FC<WithClassName<Props>> = (props) => {
  const {
    cover,
    avatar,
    avatarShape,
    label,
    blur = 2,
    className,
  } = props

  const { i18n } = useTranslation()

  const avatarSize = 48
  const avatarOffset = 8
  const avatarShift = avatar
    ? `calc(${avatarSize}px * 0.5 + ${avatarOffset}px)`
    : undefined

  const coverAlt = label
    ? i18n.t('coverOf', { name: label })
    : i18n.t('cover')

  return (
    <div
      className={classNames('tw-relative', className)}
      style={{ paddingBottom: avatarShift }}
    >
      <div className="tw-h-32 tw-bg-dim-2 tw-w-full tw-relative tw-overflow-hidden">
        <Skeleton.Element className="tw-absolute tw--inset-0">
          <div
            className="tw-absolute"
            style={{
              top: `-${blur}px`,
              right: `-${blur}px`,
              bottom: `-${blur}px`,
              left: `-${blur}px`,
            }}
          >
            {cover
              ? (
                // TODO: Provide placeholder="blur" & blurDataUrl
                <Image
                  className="tw-object-cover tw-bg-viewport"
                  style={{ filter: `blur(${blur}px)` }}
                  src={cover}
                  alt={coverAlt}
                  fill
                />
                )
              : null
            }
          </div>
        </Skeleton.Element>
      </div>

      {avatar
        ? <Avatar
            src={avatar}
            label={label}
            shape={avatarShape}
            size={avatarSize}
            offset={avatarOffset}
          />
        : null
      }
    </div>
  )
}
