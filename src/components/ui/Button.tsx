import { forwardRef } from 'react'
import classNames from 'classnames'
import type { ButtonProps, WithClassName } from '../../models'
import { useUiSize } from '../../hooks'

export const Button = forwardRef<HTMLButtonElement, WithClassName<ButtonProps>>((props, ref) => {
  const {
    children,
    appearance = 'primary',
    icon = null,
    iconLeft = null,
    iconRight = null,
    className,
    scale,
    ...attributes
  } = props

  const size = useUiSize(scale) ?? 'md'
  const noContent = !(children || iconLeft || iconRight)

  return (
    <button
      ref={ref}
      {...attributes}
      className={classNames(
        'tw-button',
        `tw-ui-${size}`,
        className,
        {
          'tw-button-icon': noContent,
          'tw-button-primary': appearance === 'primary',
          'tw-button-secondary': appearance === 'secondary',
        },
      )}
    >
      {icon ?? (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'
