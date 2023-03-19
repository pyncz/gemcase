import type { FC, PropsWithChildren } from 'react'

export const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="tw-px-6 tw-pt-2 tw-pb-10 tw-space-y-fields tw-text-center">
      {children}
    </div>
  )
}
