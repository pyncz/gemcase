import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { WithClassName } from '../models'

interface Props {
  cover?: string
  avatar?: string
  alt: string
}

export const ProfileHeader: FC<WithClassName<Props>> = (props) => {
  const { cover, avatar, alt, className } = props
  const { i18n } = useTranslation()

  const avatarSize = 48
  const avatarOffset = 8
  const avatarShift = avatar
    ? `calc(${avatarSize}px * 0.5 + ${avatarOffset}px)`
    : undefined

  return (
    <div
      className={classNames('tw-relative', className)}
      style={{ paddingBottom: avatarShift }}
    >
      <div className="tw-h-32 tw-bg-dim-2 tw-w-full tw-relative tw-overflow-hidden">
        <div className="tw-absolute tw--inset-0.5">
          {cover
            ? (
              // TODO: Provide placeholder="blur" & blurDataUrl
              <Image
                className="tw-object-cover tw-blur-xs"
                src={cover}
                alt={i18n.t('coverOf', { name: alt })}
                fill
              />
              )
            : null
          }
        </div>
      </div>

      {avatar
        ? (
          <div className="tw-absolute tw-bottom-0 tw-left-1/2 tw--translate-x-1/2 tw-rounded-lg tw-bg-base" style={{ padding: `${avatarOffset}px` }}>
            {/* TODO: Provide placeholder="blur" & blurDataUrl */}
            <Image
              className="tw-object-cover tw-rounded tw-border-avatar"
              src={avatar}
              alt={i18n.t('avatarOf', { name: alt })}
              width={avatarSize}
              height={avatarSize}
            />
          </div>
          )
        : null
      }
    </div>
  )
}
