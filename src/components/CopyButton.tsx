import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { Icon } from '@iconify-icon/react'
import copyIcon from '@iconify/icons-ion/copy-outline'
import successIcon from '@iconify/icons-ion/checkmark-outline'
import classNames from 'classnames'
import { useCopyToClipboard } from '../hooks'
import type { WithClassName } from '../models'

interface Props {
  value: string
}

export const CopyButton: FC<PropsWithChildren<WithClassName<Props>>> = (props) => {
  const { children, value, className } = props

  const { copy, justCopied } = useCopyToClipboard(value)

  const icon = useMemo(() => justCopied ? successIcon : copyIcon, [justCopied])

  return (
    <a
      className={classNames('tw-inline-flex tw-link tw-link-muted', className)}
      role="button"
      onClick={copy}
      title={value}
    >{
      children
        ? <span className="tw-text-dim-1">{children}</span>
        : null
      }<Icon icon={icon} className="tw-relative tw-left-px tw-top-0.5" /></a>
  )
}
