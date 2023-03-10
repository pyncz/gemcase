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
      className={classNames(
        'tw-group/option',
        '!tw-outline-none tw-flex tw-text-ellipsis tw-rounded-sm tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-fast',
        'tw-bg-[rgba(var(--c-select-option-bg),_var(--tw-bg-opacity))] tw-bg-opacity-[var(--o-select-option-bg)] tw-text-[rgba(var(--c-select-option-text),_var(--tw-text-opacity))]',
        'hover:tw-bg-[rgba(var(--c-select-option-bg--hover),_var(--tw-bg-opacity))] hover:tw-bg-opacity-[var(--o-select-option-bg--hover)] hover:tw-text-[rgba(var(--c-select-option-text--hover),_var(--tw-text-opacity))] data-highlighted:tw-text-[rgba(var(--c-select-option-text--highlighted),_var(--tw-text-opacity))] data-highlighted:tw-underline',
        'checked:tw-text-[rgba(var(--c-select-option-checked-text),_var(--tw-text-opacity))] checked:data-highlighted:tw-text-[rgba(var(--c-select-option-checked-text--hover),_var(--tw-text-opacity))] checked:tw-bg-[rgba(var(--c-select-option-checked-bg),_var(--tw-bg-opacity))] checked:tw-bg-opacity-[var(--o-select-option-checked-bg)]',
        'disabled:tw-pointer-events-none data-disabled:tw-pointer-events-none disabled:tw-text-[rgba(var(--c-select-option-disabled-text),_var(--tw-text-opacity))] data-disabled:tw-text-[rgba(var(--c-select-option-disabled-text),_var(--tw-text-opacity))] disabled:tw-opacity-muted data-disabled:tw-opacity-muted',
        className,
      )}
    >
      <RadixSelect.ItemText>
        {render?.(option, { selected }) ?? value}
      </RadixSelect.ItemText>
      <RadixSelect.ItemIndicator
        className={classNames(
          'tw-flex-center tw-duration-fast tw-inline-flex tw-text-7/8 tw-circle-[1.25em] tw-ml-auto tw-text-white tw-font-black',
          'tw-bg-[rgba(var(--c-select-accent),_var(--tw-text-opacity))] group-data-highlighted/option:tw-bg-[rgba(var(--c-select-accent--hover),_var(--tw-text-opacity))]',
        )}
      >
        <Icon icon={selectedIcon} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})

SelectItem.displayName = 'SelectItem'
