import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { SizeExtra } from '@voire/type-utils'

type Appearance = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  scale?: SizeExtra
  appearance?: Appearance
  icon?: ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
}
