import type { FC, PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'
import type { WithClassName } from '../models'
import { CopyButton } from './CopyButton'

interface Props {
  label?: ReactNode
  textValue?: string
}

const AttributeCell: FC<WithClassName<PropsWithChildren>> = (props) => {
  const { children, className } = props

  return (
    <div className={classNames('tw-overflow-hidden tw-flex-1 tw-flex-center', className)}>
      <div className="tw-inline-flex tw-max-w-full">{children}</div>
    </div>
  )
}

export const Attribute: FC<WithClassName<PropsWithChildren<Props>>> = (props) => {
  const {
    label,
    children,
    textValue = ['string', 'number'].includes(typeof children)
      ? children?.toString()
      : undefined,
    className,
  } = props

  return (
    <div className={classNames('tw-group/attr tw-items-center tw-duration-fast tw-flex tw-flex-col xs:tw-flex-row tw-text-7/8 tw-gap-1.5 xs:tw-gap-3 tw-pb-3 tw-border-b tw-border-dashed tw-border-separator-muted hover:tw-border-separator', className)}>
      {label
        ? <>
          <AttributeCell className="tw-opacity-muted">
            {label}
          </AttributeCell>
          <span className="tw-hidden sm:tw-inline tw-duration-fast tw-text-[rgb(var(--c-separator))] group-hover/attr:tw-text-[rgb(var(--c-separator-vivid))]">-</span>
        </>
        : null
      }
      <AttributeCell>
        {children}
        {textValue
          ? <CopyButton className="!tw-border-none" value={textValue} />
          : null
        }
      </AttributeCell>
    </div>
  )
}
