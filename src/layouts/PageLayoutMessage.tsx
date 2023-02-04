import type { FC, PropsWithChildren } from 'react'
import { LayoutSide } from './LayoutSide'
import { LayoutBase } from './LayoutBase'

/**
 * A layout for message pages, e.g. error summary or some other short feedback.
 */
export const PageLayoutMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutBase>
      <LayoutSide className="tw-h-full">
        <div className="tw-h-full tw-flex tw-items-center">
          {children}
        </div>
      </LayoutSide>
    </LayoutBase>
  )
}
