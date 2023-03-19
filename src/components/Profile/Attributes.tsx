import type { FC, PropsWithChildren } from 'react'

export const Attributes: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="tw-space-y-fields tw-py-4">
      {children}
    </div>
  )
}
