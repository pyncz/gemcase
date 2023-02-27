import type { FC, PropsWithChildren } from 'react'

export const Tag: FC<PropsWithChildren> = ({ children }) => {
  return (
    <small className="tw-text-3/4 tw-rounded tw-bg-dim-2 tw-text-dim-2 tw-px-[0.25em] tw-py-[0.0625em]">
      {children}
    </small>
  )
}
