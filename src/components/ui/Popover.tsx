import * as RadixPopover from '@radix-ui/react-popover'
import type { FC, PropsWithChildren, ReactNode } from 'react'

interface Props {
  trigger: ReactNode
}

export const Popover: FC<PropsWithChildren<Props>> = (props) => {
  const { trigger, children } = props

  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild className="PopoverTrigger">
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content className="PopoverContent">
          {children}
          <RadixPopover.Arrow className="PopoverArrow" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
