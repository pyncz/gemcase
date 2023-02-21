import type { Optional } from '@voire/type-utils'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useEffect, useMemo } from 'react'
import { DEFAULT_THEME, THEME_LOCAL_STORAGE_KEY, themes } from '../consts'
import { useOnMounted, usePrefersDarkMode } from '../hooks'
import type { ColorModeValue, Theme } from '../models'
import * as storage from '../utils/localStorage'

interface ColorModeContextType {
  /** Color mode selected */
  colorMode: ColorModeValue

  /** If the user prefers dark mode */
  prefersDarkMode: Optional<boolean>

  /** System preferred theme */
  colorPreference: Optional<Theme>

  /** Theme actually applied */
  currentTheme: Theme

  /** Theme applied if there's no theme specified */
  fallbackTheme: Theme

  switchColorMode: (_theme: Theme | null) => void
}

export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: null,
  colorPreference: undefined,
  prefersDarkMode: undefined,
  currentTheme: DEFAULT_THEME,
  fallbackTheme: DEFAULT_THEME,
  switchColorMode: () => {},
})

export const ColorModeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  // On mounted, populate color mode from localStorage
  const [colorMode, setColorMode] = useOnMounted<ColorModeValue>(() => {
    return storage.loadState<ColorModeValue>(THEME_LOCAL_STORAGE_KEY) ?? null
  }, null)

  const switchColorMode = (newColorMode: ColorModeValue) => {
    setColorMode(newColorMode)

    // Save to localStorage
    storage.saveState(THEME_LOCAL_STORAGE_KEY, newColorMode)
  }

  const prefersDarkMode = usePrefersDarkMode()
  const colorPreference = useMemo(() => {
    return typeof prefersDarkMode === 'undefined'
      ? undefined
      : prefersDarkMode ? 'black' : 'light'
  }, [prefersDarkMode])

  const fallbackTheme = useMemo(() => {
    return colorPreference ?? DEFAULT_THEME
  }, [colorPreference])

  const currentTheme = useMemo(() => {
    return colorMode ?? fallbackTheme
  }, [colorMode, fallbackTheme])

  useEffect(() => {
    // Update <html> classes
    const root = document.getElementsByTagName('html')[0]!

    // Clear the previous theme classes
    root.classList.remove(...themes.map(theme => `${theme}-mode`))
    // Add the corresponding theme class
    root.classList.add(`${currentTheme}-mode`)
  }, [currentTheme])

  return (
    <ColorModeContext.Provider
      value={{
        colorMode: colorMode!,
        prefersDarkMode,
        colorPreference,
        currentTheme,
        fallbackTheme,
        switchColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  )
}
