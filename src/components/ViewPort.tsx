import classNames from 'classnames'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import type { WithClassName } from '../models'

interface Props {
  overlay?: ReactNode
}

export const ViewPort: FC<WithClassName<PropsWithChildren<Props>>> = (props) => {
  const { children, overlay, className } = props

  return (
    <div
      className={classNames(
        'tw-relative tw-w-full tw-h-[calc(100vh-var(--h-sidebar))] sm:tw-h-screen tw-bg-viewport',
        'before:tw-absolute before:tw-inset-0 before:tw-bg-dim-2 before:tw-opacity-muted before:tw-mask-radial',
        className,
      )}
    >
      <div className="tw-absolute tw-inset-8 md:tw-inset-12 lg:tw-inset-16 xl:tw-inset-20 tw-flex-center">
        {children}
      </div>
      {overlay
        ? (
          <div className="tw-absolute tw-inset-0">
            {overlay}
          </div>
          )
        : null
      }
    </div>
  )
}
