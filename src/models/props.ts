import type { ReactNode } from 'react'

export type Slots<K extends string> = {
  [P in K]: ReactNode
}

export type OptionalSlots<K extends string> = Partial<Slots<K>>

export type WithClass<T = any> = T & {
  className?: string
}
