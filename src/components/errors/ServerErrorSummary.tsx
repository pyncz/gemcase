import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'next-i18next'
import { ExploreForm } from '../ExploreForm'

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
    <div className="tw-pb-4 tw-space-y-6">
      <div>
        <h2 className="tw-mb-2">
          {
            code
              ? (<><span className="tw-h1 tw-mask-linear tw-mask-dir-to-b tw-mask-to-muted tw-drop-shadow-title tw-text-accent-primary">{code}</span>{' '}</>)
              : null
          }
          {errorTitle}
        </h2>

        <div className="tw-text-dim-2 tw-max-w-sm">
          {children ? <p>{children}</p> : null}
        </div>
      </div>

      <ExploreForm />
    </div>
  )
}
