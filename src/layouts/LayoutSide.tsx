import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import type { WithClassName, WithOptionalSlots } from '../models'

type Props = WithClassName<WithOptionalSlots<'details'>>

/**
 * A **utility** layout splitting page on Main and Detail content.
 */
export const LayoutSide: FC<PropsWithChildren<Props>> = ({ children, details, className }) => {
  return (
    <div className={classNames('tw-snap-y tw-snap-mandatory tw-h-full md:tw-grid md:tw-grid-cols-[3fr_minmax(20rem,1fr)]', className)}>
      <aside className="tw-border-b tw-border-b-separator md:tw-max-h-screen md:tw-sticky md:tw-top-0 md:tw-overflow-y-auto md:tw-col-[2] md:tw-border-b-0 md:tw-border-l md:tw-border-l-separator">
        {details ?? null}
      </aside>

      <div className="tw-overflow-y-auto tw-overflow-x-hidden tw-col-[1] tw-row-[1]">
        {children ?? null}
      </div>
    </div>
  )
}
