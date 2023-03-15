import classNames from 'classnames'
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
  const isActive = router.pathname === href

  return (
    <Tooltip
      position={tooltipPosition}
      trigger={
        <Link
          href={href}
          className={classNames(
            '!tw-outline-none !tw-border-none tw-text-2xl tw-flex tw-p-3 tw-relative tw-duration-fast before:tw-bg-[rgb(var(--c-navlink))] before:tw-mask-radial before:tw-absolute before:tw-inset-0 before:tw-duration-normal',
            'active:before:tw-scale-[0.85]',
            isActive
              ? 'tw-text-[rgba(var(--c-navlink-active-color),_var(--tw-text-opacity))] hover:tw-text-[rgba(var(--c-navlink-active-color--hover),_var(--tw-text-opacity))] before:tw-scale-normal before:tw-opacity-20'
              : 'tw-text-[rgba(var(--c-navlink-color),_var(--tw-text-opacity))] hover:tw-text-[rgba(var(--c-navlink-color--hover),_var(--tw-text-opacity))] before:tw-scale-50 before:tw-opacity-0',
          )}
        >
          {children}
        </Link>
      }
    >
      {tooltip}
    </Tooltip>
  )
}
