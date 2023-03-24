import type { FC, PropsWithChildren } from 'react'

export const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="tw-px-6 tw-pt-2 tw-pb-10 tw-space-y-4 tw-text-center">
      {children}
    </div>
  )
}
