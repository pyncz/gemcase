import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { RadioGroup } from './ui'

export const LocaleRadio: FC = () => {
  const { i18n } = useTranslation()
  const router = useRouter()

  if (!router.locales) {
    return null
  }

  const disabled = router.locales.length < 2

  return (
    <RadioGroup<string, string>
      defaultValue={i18n.language}
      options={router.locales}
      disabled={disabled}
      getValue={option => option}
      onValueChange={(locale) => {
        const { pathname, asPath, query } = router
        router.push({ pathname, query }, asPath, { locale })
      }}
    />
  )
}
