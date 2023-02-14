import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'next-i18next'

interface Props {
  code?: number
}

export const ServerErrorSummary: FC<PropsWithChildren<Props>> = ({ code, children }) => {
  const { i18n } = useTranslation()

  const errorTitle = code === 404
    ? i18n.t('errors.notFound')
    : code === 500
      ? i18n.t('errors.serverError')
      : i18n.t('errors.unexpected')

  return (
    <div>
      <span>
      {
        code
          ? <h1 className="tw-mask-linear tw-mask-dir-to-b tw-mask-from-full tw-mask-to-muted tw-bg-clip-text tw-drop-shadow-title tw-text-transparent tw-bg-gradient-to-b tw-from-accent-primary tw-to-accent-secondary">{code}</h1>
          : null
      }
      <h2>{errorTitle}</h2>
      </span>

      {children ? <p>{children}</p> : null}
    </div>
  )
}
