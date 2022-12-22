import type { FC, PropsWithChildren } from 'react'
import { LayoutBase } from './LayoutBase'
import { LayoutSide } from './LayoutSide'

/**
 * A layout for additional / docs pages, e.g. About, FAQ, etc.
 */
export const PageLayoutDocs: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutBase>
      <LayoutSide>
        <article className="tw-h-full tw-flex tw-items-center">
          {children}
        </article>
      </LayoutSide>
    </LayoutBase>
  )
}
