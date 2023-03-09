import { useContext } from 'react'
import { ColorModeContext } from '../contexts'

export const useColorMode = () => useContext(ColorModeContext)
