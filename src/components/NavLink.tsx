import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC, PropsWithChildren } from 'react'
import type { Position } from '../models'
import { Tooltip } from './ui'

interface Props {
  href: string
  tooltip?: string
  tooltipPosition?: Position
}

export const NavLink: FC<PropsWithChildren<Props>> = ({ children, href, tooltip, tooltipPosition }) => {
  const router = useRouter()
  const activeClass = router.pathname === href
    ? 'tw-text-navlink before:tw-scale-normal before:tw-opacity-20'
    : 'tw-text-dim-2 hover:tw-text-dim-1 before:tw-scale-50 before:tw-opacity-0'

  return (
    <Tooltip
      position={tooltipPosition}
      trigger={
        <Link
          href={href}
          className={`!tw-border-0 tw-text-2xl tw-flex tw-p-3 tw-relative tw-duration-fast tw-rounded-navlink before:tw-navlink-bg before:tw-absolute before:tw-inset-0 before:tw-rounded-navlink before:tw-duration-normal before:tw-origin-center ${activeClass} active:before:tw-scale-[0.85]`}
        >
          {children}
        </Link>
      }
    >
      {tooltip}
    </Tooltip>
  )
}
