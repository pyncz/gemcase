import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'

export const ViewPort: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={classNames(
        'tw-relative tw-w-full tw-h-[calc(100vh-var(--h-sidebar))] sm:tw-h-screen tw-bg-viewport',
        'before:tw-absolute before:tw-inset-0 before:tw-bg-dim-2 before:tw-opacity-muted before:tw-mask-radial',
      )}
    >
      <div className="tw-absolute tw-inset-x-8 tw-inset-y-16 tw-flex-center">
        {children}
      </div>
    </div>
  )
}
