import type { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Icon } from '@iconify-icon/react'
import githubIcon from '@iconify-icons/ion/logo-github'
import { ErrorBoundary, LogoMain } from '../components'
import { getYearsFrom } from '../utils'

/**
 * A **base** layout with nav bar, logo, etc.
 */
export const LayoutBase: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()

  const years = getYearsFrom(2022)

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col md:tw-flex-row">
      <div className="tw-w-12">
        <LogoMain />
        <div>...nav</div>

        <footer className="tw-text-sm tw-text-dim-3 tw-space-y-1.5">
          <nav className="tw-flex tw-gap-1.5">
            <Link href="/" className="tw-link-muted !tw-border-0">
              {i18n.t('pages.index.title')}
            </Link>
            <Link href="/about" className="tw-link-muted !tw-border-0">
              {i18n.t('pages.about.title')}
            </Link>
          </nav>
          <div className="tw-text-xs">
            {years}.
            {i18n.t('madeBy')}
            <a
              className="tw-pb-0.5"
              target="_blank"
              href="https://github.com/pyncz"
              rel="noreferrer"
            ><Icon icon={githubIcon} />
              pyncz</a>
          </div>
        </footer>
      </div>

      <div className="tw-flex-1">
        {/* Catch main content's errors */}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  )
}
