import type { IconifyIcon } from '@iconify-icon/react'
import { Icon } from '@iconify-icon/react'
import type { FC, PropsWithChildren } from 'react'
import { withLeadingSlash } from 'ufo'
import twitterIcon from '@iconify/icons-bx/bxl-twitter'
import telegramIcon from '@iconify/icons-bx/bxl-telegram'
import facebookIcon from '@iconify/icons-bx/bxl-facebook-circle'
import type { SharePlatform } from '../../models'
import { getAbsoluteBaseUrl } from '../../utils'
import { ButtonLink, Popover } from '../ui'
import { sharingPlatforms } from '../../consts'
import { sharer } from '../../services/share'

interface Props {
  url: string
  message?: string
  hashtags?: string[]
}

export const SharePopup: FC<PropsWithChildren<Props>> = (props) => {
  const {
    url,
    message,
    hashtags,
    children,
  } = props

  const absoluteUrl = `${getAbsoluteBaseUrl()}${withLeadingSlash(url)}`

  const iconMap: Record<SharePlatform, IconifyIcon> = {
    twitter: twitterIcon,
    telegram: telegramIcon,
    facebook: facebookIcon,
  }

  return (
    <Popover trigger={children}>
      <div className="tw-flex tw-gap-1">
        {sharingPlatforms.map(platform => (
          <ButtonLink
            key={platform}
            targetBlank
            appearance="secondary"
            scale="sm"
            href={sharer[platform]({
              url: absoluteUrl,
              message,
              hashtags,
            })}
            icon={<Icon icon={iconMap[platform]} />}
          />
        ))}
      </div>
    </Popover>
  )
}
