import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { LogoMain } from '../components'
import { LayoutBase } from './LayoutBase'
import { LayoutSide } from './LayoutSide'

/**
 * A layout for additional / docs pages, e.g. About, FAQ, etc.
 */
export const PageLayoutDocs: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutBase>
      <LayoutSide className="tw-h-full">
        <article className="tw-px-container tw-py-section tw-w-full tw-block tw-max-w-[48rem] tw-mx-auto">
          <div className="tw-flex sm:tw-hidden">
            <Link href="/" className="tw-relative tw--left-1 tw--top-4">
              <LogoMain size="sm" />
            </Link>
          </div>

          {children}
        </article>
      </LayoutSide>
    </LayoutBase>
  )
}
