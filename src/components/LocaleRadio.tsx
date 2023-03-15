import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type { WithClassName } from '../models'
import { RadioGroup } from './ui'

export const LocaleRadio: FC<WithClassName> = ({ className }) => {
  const { i18n } = useTranslation()
  const router = useRouter()

  if (!router.locales) {
    return null
  }

  return (
    <RadioGroup
      className={className}
      defaultValue={i18n.language}
      options={router.locales}
      onChange={(locale) => {
        const { pathname, asPath, query } = router
        router.push({ pathname, query }, asPath, { locale })
      }}
    />
  )
}
