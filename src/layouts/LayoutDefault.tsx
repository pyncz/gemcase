import type { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import type { OptionalSlots } from '../models'
import { LogoMain } from '../components'
import { getYearsFrom } from '../utils'
import { LayoutSide } from './LayoutSide'
import GithubIcon from '~icons/ion/logo-github.jsx'

type Props = OptionalSlots<'details'>

export const LayoutDefault: FC<PropsWithChildren<Props>> = ({ children, details }) => {
  const { i18n } = useTranslation()

  const years = getYearsFrom(2022)

  return (
    <div className="md:tw-flex">
      <div className="tw-w-12">
        <LogoMain />
      </div>
      <LayoutSide className="md:tw-flex-1 md:tw-h-screen" details={
        <>
          <div>
            {details}
          </div>
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
              ><GithubIcon />
                pyncz</a>
            </div>
          </footer>
        </>
      }>

        <div>
          search palette
        </div>
        <div>
          {children}
        </div>

      </LayoutSide>
    </div>
  )
}
