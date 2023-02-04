import type { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Icon } from '@iconify-icon/react'
import exploreIcon from '@iconify-icons/ion/compass-outline'
import infoIcon from '@iconify-icons/ion/information-circle-outline'
import settingsIcon from '@iconify-icons/ion/cog-outline'
import { ErrorBoundary, LogoMain } from '../components'
import { NavLink } from '../components/NavLink'
import { useBreakpoint } from '../hooks'
import type { Direction } from '../models'

/**
 * A **base** layout with nav bar, logo, etc.
 */
export const LayoutBase: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  const gteSmScreen = useBreakpoint('sm')
  const linksDir: Direction = gteSmScreen ? 'y' : 'x'

  return (
    <div className="tw-min-h-screen tw-grid tw-grid-cols-[minmax(0,1fr)]">
      <div className="tw-pb-sidebar sm:tw-pb-0 sm:tw-pl-sidebar">
        {/* Catch main content's errors */}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>

      <nav className="tw-bg-base tw-border-t tw-border-separator tw-fixed tw-w-screen tw-bottom-0 sm:tw-border-t-0 sm:tw-border-r tw-h-sidebar sm:tw-h-screen sm:tw-w-sidebar sm:tw-bottom-0 tw-flex sm:tw-flex-col tw-gap-1.5 tw-items-center tw-justify-center sm:tw-justify-start tw-p-2 sm:tw-p-5 tw-m-auto">
        <Link href="/" className="tw-hidden sm:tw-inline-block tw-mb-3">
          <LogoMain />
        </Link>

        <NavLink href="/" tooltip={i18n.t('pages.index.title')} dir={linksDir}>
          <Icon icon={exploreIcon} />
        </NavLink>
        <NavLink href="/about" tooltip={i18n.t('pages.about.title')} dir={linksDir}>
          <Icon icon={infoIcon} />
        </NavLink>
        <NavLink href="/settings" tooltip={i18n.t('pages.settings.title')} dir={linksDir}>
          <Icon icon={settingsIcon} />
        </NavLink>
      </nav>
    </div>
  )
}
