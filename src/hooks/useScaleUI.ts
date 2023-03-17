import { useContext } from 'react'
import type { SizeExtra } from '@voire/type-utils'
import { ScaleUiContext } from '../contexts'

export const useUiScale = () => useContext(ScaleUiContext)

export const useUiSize = (forcedSize?: SizeExtra) => {
  const ctxSize = useContext(ScaleUiContext).size
  return forcedSize ?? ctxSize
}
