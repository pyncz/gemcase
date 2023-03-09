import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { Icon } from '@iconify-icon/react'
import chevronDownIcon from '@iconify-icons/ion/chevron-down'
import classNames from 'classnames'
import chevronUpIcon from '@iconify-icons/ion/chevron-up'
import { useUiSize, useUncontrolledValue } from '../../../../hooks'
import type { Size, WithClassName } from '../../../../models'
import { SelectItem } from './Item'

interface Props<
  TOption = unknown,
  TValue extends string = string,
> {
  value?: TValue
  options: TOption[]
  defaultValue?: TValue
  getValue?: (option: TOption) => TValue
  id?: string
  ariaLabel?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: TValue) => void
  getTextValue?: (option: TOption) => string
  renderOption?: (option: TOption, options: {
    selected: boolean
  }) => ReactNode
  scale?: Size
}

export const Select = forwardRef<HTMLButtonElement, WithClassName<Props>>((props, ref) => {
  const {
    id,
    options,
    getValue = o => o as string,
    ariaLabel,
    placeholder,
    onChange,
    getTextValue,
    renderOption,
    disabled,
    className,
    scale,
    value,
    ...attributes
  } = props
  const { defaultValue } = attributes

  const [localValue, setLocalValue] = useUncontrolledValue(value, defaultValue)

  const size = useUiSize(scale) ?? 'md'

  return (
    <RadixSelect.Root
      {...attributes}
      disabled={disabled || options.length < 2}
      value={localValue}
      onValueChange={(newValue) => {
        setLocalValue(newValue)
        onChange?.(newValue)
      }}
    >
      <RadixSelect.Trigger
        id={id}
        ref={ref}
        className={classNames(
          'tw-input tw-pr-8 tw-relative tw-ring tw-ring-accent-primary tw-ring-opacity-0',
          'focus:tw-ring-opacity-muted focus-within:tw-ring-opacity-muted',
          `tw-ui-${size}`,
          className,
        )}
        aria-label={ariaLabel}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="tw-text-accent-primary tw-inline-flex tw-absolute tw-right-2">
          <Icon icon={chevronDownIcon} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content>
          <RadixSelect.ScrollUpButton>
            <Icon icon={chevronUpIcon} />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport>
            {...options.map((option) => {
              const optionValue = getValue(option)
              return (
                <SelectItem
                  key={optionValue}
                  option={value}
                  value={optionValue}
                  textValue={getTextValue?.(option)}
                  selected={localValue === optionValue}
                  render={renderOption}
                />
              )
            })}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton>
            <Icon icon={chevronDownIcon} />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
})

Select.displayName = 'Select'
