import type { FC, PropsWithChildren } from 'react'
import type { WithClassName } from '../../models'

const Root: FC<PropsWithChildren<WithClassName>> = ({ children, className }) => {
  return (
    <span className={`tw-text-dim-1 ${className}`}>
      {children}
    </span>
  )
}

const Divider: FC<WithClassName> = ({ className }) => <span className={`tw-font-mono tw-opacity-20 tw-font-bold tw-mx-1 ${className}`}>/</span>

export const Breadcrumps = { Root, Divider }
