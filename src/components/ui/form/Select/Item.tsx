import * as RadixSelect from '@radix-ui/react-select'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import classNames from 'classnames'
import { Icon } from '@iconify-icon/react'
import selectedIcon from '@iconify-icons/ion/checkmark-outline'
import type { WithClassName } from '../../../../models'

interface Props<
  TOption = unknown,
  TValue extends string = string,
> {
  option: TOption
  value: TValue
  render?: (option: TOption, options: {
    selected: boolean
  }) => ReactNode
  textValue?: string
  disabled?: boolean
  selected?: boolean
}

export const SelectItem = forwardRef<HTMLDivElement, WithClassName<Props>>((props, ref) => {
  const {
    option,
    render,
    className,
    selected = false,
    ...attributes
  } = props
  const { value } = attributes

  return (
    <RadixSelect.Item
      ref={ref}
      {...attributes}
      className={classNames(className)}
    >
      <RadixSelect.ItemText>
        {render?.(option, { selected }) ?? value}
      </RadixSelect.ItemText>
      <RadixSelect.ItemIndicator>
        <Icon icon={selectedIcon} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})

SelectItem.displayName = 'SelectItem'
