import classNames from 'classnames'
import Link from 'next/link'
import type { FC } from 'react'
import type { ButtonProps, WithClassName } from '../../models'
import { Button } from './Button'

interface Props extends ButtonProps {
  href: string
  targetBlank?: boolean
}

export const ButtonLink: FC<WithClassName<Props>> = (props) => {
  const { href, targetBlank, className, ...buttonProps } = props
  const target = targetBlank ? '_blank' : undefined

  return (
    <Link
      href={href}
      target={target}
      className={classNames('!tw-border-none', className)}
    >
      <Button {...buttonProps} className="tw-w-full tw-h-full" />
    </Link>
  )
}
