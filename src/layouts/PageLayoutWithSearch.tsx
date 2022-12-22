import type { FC, PropsWithChildren } from 'react'
import { LayoutBase } from './LayoutBase'

/**
 * A default layout for the pages, with sidebar and search palette.
 */
export const PageLayoutWithSearch: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutBase>
      <div>
        search palette (absolute)
      </div>
      {children}
    </LayoutBase>
  )
}
