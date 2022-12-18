import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'

export const LocaleSwitcher: FC = () => {
  const { i18n } = useTranslation()
  const { locales } = useRouter()

  if (!locales || locales.length < 2) {
    return null
  }

  return (
    <>
      {locales.map(locale => (
        <Link
          href="/"
          key={locale}
          locale={locale}
          className={locale === i18n.language ? 'active' : undefined}
        >
          <button>{locale}</button>
        </Link>
      ))}
    </>
  )
}
