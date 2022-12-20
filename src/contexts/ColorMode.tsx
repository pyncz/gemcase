import type { FC, PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'

export const themes = ['light', 'dark', 'black'] as const
export type Theme = typeof themes[number]

export const THEME_LOCAL_STORAGE_KEY = 'color-mode'

export const ColorModeContext = React.createContext<{
  colorMode: Theme | null
  switchColorMode: (_theme: Theme | null) => void
}>({
      colorMode: null,
      switchColorMode: () => {},
    })

export const ColorModeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [colorMode, setColorMode] = useState<Theme | null>(
    null,
  )

  // On mounted, populate color mode from localStorage
  useEffect(() => {
    setColorMode(localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme | null)
  }, [])

  const switchColorMode = (theme: Theme | null) => {
    setColorMode(theme)

    // save to localStorage
    if (theme) {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme)
    } else {
      localStorage.removeItem(THEME_LOCAL_STORAGE_KEY)
    }

    // update <html> classes
    const root = document.getElementsByTagName('html')[0]!

    // Clear classes and add the corresponding theme-class if specified
    root.classList.remove(...themes.map(theme => `${theme}-mode`))
    if (theme) {
      root.classList.add(`${theme}-mode`)
    }
  }

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        switchColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  )
}
