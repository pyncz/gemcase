import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useOnMounted } from '../../../hooks'

interface Props<
  TOption = any,
  TValue extends string = string,
> {
  value: TValue
  option: TOption
  render?: (option: TOption, options: {
    checked: boolean
    id?: string
  }) => ReactNode
  disabled?: boolean
  checked?: boolean
}

export const RadioGroupItem = <
  TOption = any,
  TValue extends string = string,
>(props: Props<TOption, TValue>) => {
  const {
    value,
    option,
    render,
    disabled = false,
    checked = false,
  } = props

  const [id, _] = useOnMounted(uuidv4, undefined)

  const optionRepresentation = render
    ? render(option, { checked, id })
    : <>
        <RadixRadioGroup.Indicator />
        <label htmlFor={id}>{value}</label>
      </>

  const checkedClass = checked
    ? 'tw-text-radio-option-active before:tw-bg-radio-option-active before:tw-bg-opacity-radio-option-active before:tw-opacity-full before:tw-scale-normal'
    : 'tw-text-dim-2 hover:tw-text-dim-1 before:tw-opacity-0 before:tw-scale-50'

  return (
    <RadixRadioGroup.Item
      value={value}
      id={id}
      disabled={disabled}
      className={`tw-relative tw-p-1 tw-text-center tw-button tw-min-w-radio tw-h-12 before:tw-rounded-lg before:tw-absolute before:tw-inset-0 before:tw-transition-nobg-fast ${checkedClass} [&[data-disabled]]:tw-opacity-muted [&[data-disabled]]:tw-cursor-not-allowed`}
    >
      <span className="tw-relative tw-pointer-events-none">{optionRepresentation}</span>
    </RadixRadioGroup.Item>
  )
}
