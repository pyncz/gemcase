import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import classNames from 'classnames'
import type { Size, WithClassName } from '../../models'
import { useUiSize } from '../../hooks'

type Appearance = 'primary' | 'secondary'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  scale?: Size
  appearance?: Appearance
  icon?: ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, WithClassName<Props>>((props, ref) => {
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
        'focus:tw-ring focus:tw-ring-accent-primary focus:tw-ring-opacity-muted',
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
