import { useContext } from 'react'
import { ScaleUiContext } from '../contexts'
import type { Size } from '../models'

export const useUiScale = () => useContext(ScaleUiContext)

export const useUiSize = (forcedSize?: Size) => {
  const ctxSize = useContext(ScaleUiContext).size
  return forcedSize ?? ctxSize
}
