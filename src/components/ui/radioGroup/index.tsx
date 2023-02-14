import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { Optional } from '@voire/type-utils'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { RadioGroupItem } from './RadioGroupItem'

interface Props<TOption = any, TValue extends string = string> {
  value?: TValue
  options: TOption[]
  defaultValue?: TValue
  getValue: (option: TOption) => TValue
  label?: string
  disabled?: boolean
  onValueChange?: (value: TValue) => void
  renderOption?: (option: TOption, options: {
    checked: boolean
    id?: string
  }) => ReactNode
}

export const RadioGroup = <
  TOption = any,
  TValue extends string = string,
>(props: Props<TOption, TValue>) => {
  const {
    value,
    options,
    defaultValue,
    getValue,
    label,
    disabled = false,
    onValueChange,
    renderOption,
  } = props

  // Track the value locally to be able to compute the "checked" attribute
  // since the "value" prop can be not provided in case of no-control
  const [uncontrolledValue, setUncontrolledValue] = useState<Optional<TValue>>(defaultValue)

  const actualValue = useMemo(() => {
    return value ?? uncontrolledValue
  }, [value, uncontrolledValue])

  return (
    <div className="sm:tw-flex">
      <RadixRadioGroup.Root
        value={value}
        defaultValue={defaultValue}
        aria-label={label}
        disabled={disabled}
        className="tw-p-1 tw-rounded-xl tw-bg-radio-group tw-border tw-border-separator-muted tw-flex tw-flex-col sm:tw-flex-row tw-gap-1"
        onValueChange={(newValue: TValue) => {
          setUncontrolledValue(newValue)
          if (onValueChange) {
            onValueChange(newValue)
          }
        }}
      >
        {...options.map((option) => {
          const optionValue = getValue(option)
          return (
            <RadioGroupItem<TOption, TValue>
              key={optionValue}
              option={option}
              value={optionValue}
              disabled={disabled}
              checked={actualValue === optionValue}
              render={renderOption}
            />
          )
        })}
      </RadixRadioGroup.Root>
    </div>
  )
}
