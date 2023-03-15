import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import type { WithClassName } from '../../models'

export const Tag: FC<PropsWithChildren<WithClassName>> = (props) => {
  const { children, className } = props

  return (
    <span className={classNames('tw-rounded tw-bg-dim-3 tw-opacity-soft tw-px-[0.25em] tw-py-[0.0625em]', className)}>
      {children}
    </span>
  )
}
