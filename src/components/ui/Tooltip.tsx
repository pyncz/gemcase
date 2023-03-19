import type { FC, PropsWithChildren } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { Position } from '@voire/type-utils'
import type { WithSlots } from '../../models'

type Props = WithSlots<'trigger'> & {
  position?: Position
}

export const Tooltip: FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    trigger,
    position = 'bottom',
  } = props

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={500}>
        <RadixTooltip.Trigger asChild>
          {trigger}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="tw-popup-content"
            sideOffset={5}
            side={position}
          >
            {children}
            <RadixTooltip.Arrow className="tw-popup-arrow" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
