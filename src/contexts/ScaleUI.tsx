import type { Optional } from '@voire/type-utils'
import type { FC, PropsWithChildren } from 'react'
import { createContext } from 'react'
import type { SizeExtra } from '../models'

interface ScaleUiContextType {
  size: Optional<SizeExtra>
}

export const ScaleUiContext = createContext<ScaleUiContextType>({
  size: undefined,
})

export const ScaleUiProvider: FC<PropsWithChildren<ScaleUiContextType>> = (props) => {
  const { children, size } = props

  return (
    <ScaleUiContext.Provider value={{ size }}>
      {children}
    </ScaleUiContext.Provider>
  )
}
