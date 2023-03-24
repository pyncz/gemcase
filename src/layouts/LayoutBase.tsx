import type { FC, PropsWithChildren } from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Icon } from '@iconify-icon/react'
import exploreIcon from '@iconify/icons-ion/compass-outline'
import infoIcon from '@iconify/icons-ion/information-circle-outline'
import settingsIcon from '@iconify/icons-ion/cog-outline'
import connectIcon from '@iconify/icons-ion/link-outline'
import { Button, ErrorBoundary, LogoMain, NavLink, Tooltip } from '../components'
import { useBreakpoint } from '../hooks'

/**
 * A **base** layout with nav bar, logo, etc.
 */
export const LayoutBase: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  const gteSmScreen = useBreakpoint('sm')
  const tooltipPosition = gteSmScreen ? 'right' : 'top'

  return (
    <div className="tw-min-h-screen tw-grid tw-grid-cols-[minmax(0,1fr)]">
      <div className="tw-pb-sidebar sm:tw-pb-0 sm:tw-pl-sidebar">
        {/* Catch main content's errors */}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>

      <nav className="tw-bg-base tw-border-t tw-border-separator tw-fixed tw-w-screen tw-bottom-0 sm:tw-border-t-0 sm:tw-border-r tw-h-sidebar sm:tw-h-screen sm:tw-w-sidebar sm:tw-bottom-0 tw-flex sm:tw-flex-col tw-gap-1.5 tw-items-center tw-justify-center sm:tw-justify-start tw-p-2 sm:tw-p-5 tw-m-auto">
        <Link href="/" className="!tw-border-none tw-hidden sm:tw-inline-block tw-mb-3">
          <LogoMain />
        </Link>

        <NavLink href="/" tooltip={i18n.t('pages.index.title')} tooltipPosition={tooltipPosition}>
          <Icon icon={exploreIcon} />
        </NavLink>
        <NavLink href="/about" tooltip={i18n.t('pages.about.title')} tooltipPosition={tooltipPosition}>
          <Icon icon={infoIcon} />
        </NavLink>
        <NavLink href="/settings" tooltip={i18n.t('pages.settings.title')} tooltipPosition={tooltipPosition}>
          <Icon icon={settingsIcon} />
        </NavLink>

        <Tooltip
          position={tooltipPosition}
          trigger={
            <span className="tw-duration-normal tw-ml-auto sm:tw-ml-0 sm:tw-mt-auto tw-inline-flex tw-rounded-full hover:tw-scale-zoom">
              <Button
                scale="xl"
                disabled
                icon={<Icon className="tw--rotate-30" icon={connectIcon} />}
                appearance="primary"
                className="tw-rounded-full hover:motion-safe:tw-animate-shake"
              />
            </span>
          }
        >
          {i18n.t('connect')}
        </Tooltip>
      </nav>
    </div>
  )
}
