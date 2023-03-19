import * as RadixPopover from '@radix-ui/react-popover'
import type { Position } from '@voire/type-utils'
import type { FC, PropsWithChildren } from 'react'
import type { WithSlots } from '../../models'

type Props = WithSlots<'trigger'> & {
  position?: Position
}

export const Popover: FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    trigger,
    position = 'bottom',
  } = props

  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className="tw-popup-content"
          sideOffset={5}
          side={position}
        >
          {children}
          <RadixPopover.Arrow className="tw-popup-arrow" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
