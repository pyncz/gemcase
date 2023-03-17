import type { FC, PropsWithChildren } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import classNames from 'classnames'
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

  const transitionClasses = `
    data-[side=top]:tw-animate-slideUp
    data-[side=bottom]:tw-animate-slideDown
    data-[side=left]:tw-animate-slideLeft
    data-[side=right]:tw-animate-slideRight
  `
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={500}>
        <RadixTooltip.Trigger asChild>
          {trigger}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={classNames(
              'tw-bg-dim-2 tw-select-none tw-leading-1 tw-whitespace-nowrap tw-cursor-auto tw-text-dim-2 tw-shadow-separator-muted tw-text-xs tw-py-1.5 tw-px-2 tw-rounded-lg',
              transitionClasses,
            )}
            sideOffset={5}
            side={position}
          >
            {children}
            <RadixTooltip.Arrow className="tw-fill-dim-2" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
