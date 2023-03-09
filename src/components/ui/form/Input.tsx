import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import * as Label from '@radix-ui/react-label'
import classNames from 'classnames'
import type { MaybePromise } from '@voire/type-utils'
import type { OmitListeners, Size, WithClassName } from '../../../models'
import { useUiSize, useUncontrolledValue } from '../../../hooks'

interface Props extends OmitListeners<InputHTMLAttributes<HTMLInputElement>> {
  label?: string
  scale?: Size
  onChange?: (value: string) => MaybePromise<void>
  onBlur?: () => MaybePromise<void>
}

export const Input = forwardRef<HTMLInputElement, WithClassName<Props>>((props, ref) => {
  const {
    label,
    className,
    scale,
    value,
    defaultValue,
    onChange,
    ...attributes
  } = props
  const { id } = attributes

  const [localValue, setLocalValue] = useUncontrolledValue(value, defaultValue ?? '')

  const size = useUiSize(scale) ?? 'md'

  return (
    <>
      {label
        ? <Label.Root htmlFor={id}>{label}</Label.Root>
        : null
      }
      <input
        {...attributes}
        ref={ref}
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value)
          onChange?.(e.target.value)
        }}
        className={classNames(
          'tw-input',
          `tw-ui-${size}`,
          'focus:tw-ring focus:tw-ring-accent-primary focus:tw-ring-opacity-muted',
          className,
        )}
      />
    </>
  )
})

Input.displayName = 'Input'
