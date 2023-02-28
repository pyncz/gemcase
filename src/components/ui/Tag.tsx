import type { FC, PropsWithChildren } from 'react'
import type { WithClassName } from '../../models'

export const Tag: FC<PropsWithChildren<WithClassName>> = (props) => {
  const { children, className } = props

  return (
    <span className={`tw-rounded tw-bg-dim-2 tw-text-dim-2 tw-px-[0.25em] tw-py-[0.0625em] ${className}`}>
      {children}
    </span>
  )
}
