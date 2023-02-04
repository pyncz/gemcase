import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC, PropsWithChildren } from 'react'
import type { Direction } from '../models'

interface Props {
  href: string
  tooltip?: string
  dir?: Direction
}

export const NavLink: FC<PropsWithChildren<Props>> = ({ children, href, tooltip, dir }) => {
  const router = useRouter()
  const activeClass = router.pathname === href
    ? 'tw-text-navlink before:tw-scale-normal before:tw-opacity-20'
    : 'tw-text-dim-2 hover:tw-text-dim-1 before:tw-scale-50 before:tw-opacity-0'

  const direction: Direction = dir ?? 'x'
  const tooltipDirectionClass = direction === 'x'
    ? 'tw-mb-1 tw-bottom-4 tw-left-1/2 -tw-translate-x-1/2 group-hover/link:tw-bottom-10'
    : 'tw-ml-1 tw-left-4 tw-top-1/2 -tw-translate-y-1/2 group-hover/link:tw-left-10'
  const tooltipPopup = tooltip
    ? (
      <div className={`tw-shadow-card tw-whitespace-nowrap tw-delay-200 tw-cursor-auto tw-pointer-events-none tw-z-1 tw-text-dim-2 tw-scale-50 tw-duration-normal tw-opacity-0 tw-shadow-separator-muted tw-text-xs tw-absolute tw-py-1.5 tw-px-2 tw-rounded-lg tw-bg-dim-2 group-hover/link:tw-scale-normal group-hover/link:tw-opacity-full group-hover/link:tw-duration-fast ${tooltipDirectionClass}`}>
        { tooltip }
      </div>
      )
    : null

  return (
    <Link
      href={href}
      className={`tw-group/link !tw-border-0 tw-text-2xl tw-flex tw-p-3 tw-relative tw-duration-fast tw-rounded-navlink before:tw-navlink-bg before:tw-absolute before:tw-inset-0 before:tw-rounded-navlink before:tw-duration-normal before:tw-origin-center ${activeClass} active:before:tw-scale-[0.85]`}
    >
      {children}
      {tooltipPopup}
    </Link>
  )
}
