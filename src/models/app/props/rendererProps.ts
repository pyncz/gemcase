import type { ReactNode } from 'react'

export type RendererProps<T = unknown> = {
  render: (data: T | undefined, isLoading: boolean) => ReactNode
  renderData?: never
  placeholder?: never
  fallback?: never
} | {
  render?: never
  renderData: (data: T) => ReactNode
  placeholder?: ReactNode
  fallback?: ReactNode
}
