import type { FC, PropsWithChildren } from 'react'
import type { OptionalSlots, WithClass } from '../models'

type Props = WithClass<OptionalSlots<'details'>>

export const LayoutSide: FC<PropsWithChildren<Props>> = ({ className, children, details }) => {
  return (
    <div className={`md:tw-grid md:tw-grid-cols-side ${className ?? ''}`}>
      <div className="tw-border-b tw-border-b-separator md:tw-overflow-y-auto md:tw-col-[2] md:tw-border-b-0 md:tw-border-l md:tw-border-l-separator">
        {details ?? null}
      </div>

      <div className="tw-overflow-y-auto tw-col-[1] tw-row-[1]">
        {children ?? null}
      </div>
    </div>
  )
}
