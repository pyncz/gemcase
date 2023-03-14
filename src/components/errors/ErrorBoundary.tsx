import type { FC, PropsWithChildren } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui'

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const { i18n } = useTranslation()

  return (
    <>
      {/* Stretch error boundary on all the available space */}
      <div className="tw-flex tw-h-full tw-w-full tw-flex-center">
        <div role="alert" className="tw-space-y-8">
          <div>
            <h1 className="tw-mb-3">{i18n.t('errors.unexpected')}</h1>
            <pre className="tw-text-state-error tw-text-sm tw-bg-state-error tw-bg-opacity-10 tw-p-5 tw-rounded">
              {error.message}
            </pre>
          </div>

          <Button
            type="button"
            onClick={resetErrorBoundary}
          >
            {i18n.t('refresh')}
          </Button>
        </div>
      </div>
    </>
  )
}

interface Props {
  // Reset the state of your app so the error doesn't happen again
  onReset?: () => void
}

export const ErrorBoundary: FC<PropsWithChildren<Props>> = (props) => {
  const { onReset, children } = props

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
    >
      {children}
    </ReactErrorBoundary>
  )
}
