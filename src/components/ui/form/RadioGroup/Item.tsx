import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import classNames from 'classnames'
import type { WithClassName } from '../../../../models'

interface Props<
  TOption = unknown,
  TValue extends string = string,
> {
  value: TValue
  option: TOption
  render?: (option: TOption, options: {
    checked: boolean
  }) => ReactNode
  disabled?: boolean
  checked?: boolean
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, WithClassName<Props>>((props, ref) => {
  const {
    option,
    render,
    className,
    ...attributes
  } = props
  const { value, checked = false } = attributes

  return (
    <RadixRadioGroup.Item
      ref={ref}
      {...attributes}
      className={classNames(
        'tw-relative tw-p-1 tw-text-center tw-button tw-min-w-[5rem] tw-h-10 before:tw-rounded-lg before:tw-absolute before:tw-inset-0 before:tw-duration-nobg-fast',
        'data-disabled:tw-opacity-muted data-disabled:tw-cursor-not-allowed',
        checked
          ? 'tw-text-[rgba(var(--c-radio-option-checked-text),_var(--tw-text-opacity))] before:tw-bg-opacity-[var(--o-radio-option-checked-bg)] before:tw-bg-[rgba(var(--c-radio-option-checked-bg),_var(--tw-bg-opacity))] before:tw-scale-normal'
          : 'tw-text-[rgba(var(--c-radio-option-text),_var(--tw-text-opacity))] hover:tw-text-[rgba(var(--c-radio-option-text--hover),_var(--tw-text-opacity))] before:tw-bg-opacity-[var(--o-radio-option-bg)] before:tw-bg-[rgba(var(--c-radio-option-bg),_var(--tw-bg-opacity))] before:tw-scale-50',
        className,
      )}
    >
      <span className="tw-relative tw-pointer-events-none">
        {render?.(option, { checked }) ?? value}
      </span>
    </RadixRadioGroup.Item>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
