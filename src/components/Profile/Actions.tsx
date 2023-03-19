import type { FC, PropsWithChildren } from 'react'

export const Actions: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="tw-flex tw-flex-col xs:tw-grid xs:tw-grid-cols-[repeat(auto-fit,minmax(0,1fr))] tw-gap-2.5">
      {children}
    </div>
  )
}
