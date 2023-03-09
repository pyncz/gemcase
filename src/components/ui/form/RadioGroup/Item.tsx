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

  const checkedClass = checked
    ? 'tw-text-radio-option-active before:tw-bg-radio-option-active before:tw-bg-opacity-radio-option-active before:tw-opacity-full before:tw-scale-normal'
    : 'tw-text-dim-2 hover:tw-text-dim-1 before:tw-opacity-0 before:tw-scale-50'

  return (
    <RadixRadioGroup.Item
      ref={ref}
      {...attributes}
      className={classNames(`tw-relative tw-p-1 tw-text-center tw-button tw-min-w-radio tw-h-12 before:tw-rounded-lg before:tw-absolute before:tw-inset-0 before:tw-duration-nobg-fast ${checkedClass} [&[data-disabled]]:tw-opacity-muted [&[data-disabled]]:tw-cursor-not-allowed`, className)}
    >
      <span className="tw-relative tw-pointer-events-none">
        {render?.(option, { checked }) ?? value}
      </span>
    </RadixRadioGroup.Item>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
