import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import classNames from 'classnames'
import { useUncontrolledValue } from '../../../../hooks'
import type { WithClassName } from '../../../../models'
import { RadioGroupItem } from './Item'

interface Props<
  TOption = unknown,
  TValue extends string = string,
> {
  value?: TValue
  options: TOption[]
  defaultValue?: TValue
  getValue?: (option: TOption) => TValue
  ariaLabel?: string
  disabled?: boolean
  onChange?: (value: TValue) => void
  renderOption?: (option: TOption, options: {
    checked: boolean
  }) => ReactNode
}

export const RadioGroup = forwardRef<HTMLDivElement, WithClassName<Props>>((props, ref) => {
  const {
    options,
    getValue = o => o as string,
    ariaLabel,
    onChange,
    renderOption,
    disabled,
    className,
    value,
    ...attributes
  } = props
  const { defaultValue } = attributes

  const [localValue, setLocalValue] = useUncontrolledValue(value, defaultValue)

  const hasNoChoice = !!defaultValue && options.length < 2

  return (
    <div className="sm:tw-flex">
      <RadixRadioGroup.Root
        {...attributes}
        ref={ref}
        value={localValue}
        disabled={disabled || hasNoChoice}
        aria-label={ariaLabel}
        className={classNames('tw-p-1 tw-rounded-xl tw-bg-[rgba(var(--c-radio-bg),_var(--tw-bg-opacity))] tw-duration-fast tw-border-container tw-flex tw-flex-col sm:tw-flex-row tw-gap-1', className)}
        onValueChange={(newValue) => {
          setLocalValue(newValue)
          onChange?.(newValue)
        }}
      >
        {...options.map((option) => {
          const optionValue = getValue(option)
          return (
            <RadioGroupItem
              key={optionValue}
              option={option}
              value={optionValue}
              checked={localValue === optionValue}
              render={renderOption}
            />
          )
        })}
      </RadixRadioGroup.Root>
    </div>
  )
})

RadioGroup.displayName = 'RadioGroup'
