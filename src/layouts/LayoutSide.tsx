import type { FC, PropsWithChildren } from 'react'
import type { OptionalSlots } from '../models'

type Props = OptionalSlots<'details'>

/**
 * A **utility** layout splitting page on Main and Detail content.
 */
export const LayoutSide: FC<PropsWithChildren<Props>> = ({ children, details }) => {
  return (
    <div className="md:tw-grid md:tw-grid-cols-side">
      <aside className="tw-border-b tw-border-b-separator md:tw-overflow-y-auto md:tw-col-[2] md:tw-border-b-0 md:tw-border-l md:tw-border-l-separator">
        {details ?? null}
      </aside>

      <div className="tw-overflow-y-auto tw-col-[1] tw-row-[1]">
        {children ?? null}
      </div>
    </div>
  )
}
