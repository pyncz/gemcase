import type { FC, PropsWithChildren } from 'react'
import { Icon } from '@iconify-icon/react'
import openIcon from '@iconify-icons/ion/open-outline'

interface Props {
  href: string
}

export const ExternalLink: FC<PropsWithChildren<Props>> = ({ children, href }) => {
  return (
    <a
      className="tw-link tw-link-muted"
      target="_blank"
      href={href}
      rel="noreferrer"
    >{children}<Icon icon={openIcon} className="tw-relative tw-left-px tw-top-0.5" /></a>
  )
}
