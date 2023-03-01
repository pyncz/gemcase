import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { Icon } from '@iconify-icon/react'
import copyIcon from '@iconify-icons/ion/copy-outline'
import successIcon from '@iconify-icons/ion/checkmark-outline'
import { useCopyToClipboard } from '../hooks'

interface Props {
  value: string
}

export const CopyButton: FC<PropsWithChildren<Props>> = (props) => {
  const { children, value } = props

  const { copy, justCopied } = useCopyToClipboard(value)

  const icon = useMemo(() => justCopied ? successIcon : copyIcon, [justCopied])

  return (
    <a
      className="tw-link-muted"
      role="button"
      onClick={copy}
      title={value}
    ><span className="tw-text-dim-1">{children ?? value}</span><Icon icon={icon} className="tw-relative tw-left-px tw-top-0.5" /></a>
  )
}