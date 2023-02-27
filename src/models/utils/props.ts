import type { ReactNode } from 'react'

export type WithSlots<K extends string> = {
  [P in K]: ReactNode
}

export type WithOptionalSlots<K extends string = 'slot'> = Partial<WithSlots<K>>

export type WithClassName<T = any> = T & {
  className?: string
}
