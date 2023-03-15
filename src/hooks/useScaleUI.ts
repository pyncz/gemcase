import { useContext } from 'react'
import { ScaleUiContext } from '../contexts'
import type { SizeExtra } from '../models'

export const useUiScale = () => useContext(ScaleUiContext)

export const useUiSize = (forcedSize?: SizeExtra) => {
  const ctxSize = useContext(ScaleUiContext).size
  return forcedSize ?? ctxSize
}
