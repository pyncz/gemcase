import type { FC, PropsWithChildren } from 'react'
import { useColorMode } from '../../../hooks'
import { Whiten } from './Whiten'

export const Adjusted: FC<PropsWithChildren> = ({ children }) => {
  const { currentTheme } = useColorMode()

  return (
    <Whiten if={currentTheme !== 'light'}>
      {children}
    </Whiten>
  )
}
