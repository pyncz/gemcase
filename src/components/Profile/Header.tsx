import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { WithClassName } from '../../models'
import { Skeleton } from '../ui'

interface Props {
  cover?: string
  avatar?: string
  avatarShape?: 'circle' | 'square'
  alt?: string
  blur?: number
}

export const Header: FC<WithClassName<Props>> = (props) => {
  const {
    cover,
    avatar,
    avatarShape = 'square',
    alt,
    blur = 2,
    className,
  } = props

  const { i18n } = useTranslation()

  const avatarSize = 48
  const avatarOffset = 8
  const avatarShift = avatar
    ? `calc(${avatarSize}px * 0.5 + ${avatarOffset}px)`
    : undefined

  const avatarOuterRadius = avatarShape === 'square'
    ? `${Math.round(avatarSize / 8) + avatarOffset}px`
    : '100%'
  const avatarInnerRadius = avatarShape === 'square'
    ? `${Math.round(avatarSize / 8)}px`
    : '100%'

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
                  alt={i18n.t('coverOf', { name: alt })}
                  fill
                />
                )
              : null
            }
          </div>
        </Skeleton.Element>
      </div>

      {avatar
        ? (
          <div
            className="tw-absolute tw-bottom-0 tw-left-1/2 tw--translate-x-1/2 tw-bg-base"
            style={{
              padding: `${avatarOffset}px`,
              borderRadius: avatarOuterRadius,
            }}
          >
            {/* TODO: Provide placeholder="blur" & blurDataUrl */}
            <Image
              className="tw-object-cover tw-border-avatar tw-bg-viewport"
              src={avatar}
              alt={i18n.t('avatarOf', { name: alt })}
              width={avatarSize}
              height={avatarSize}
              style={{
                borderRadius: avatarInnerRadius,
              }}
            />
          </div>
          )
        : null
      }
    </div>
  )
}
