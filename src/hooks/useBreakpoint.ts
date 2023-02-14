import { useMemo } from 'react'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.cjs'
import { useMediaQuery } from './useMediaQuery'

const fullConfig = resolveConfig(tailwindConfig)
const screens = fullConfig.theme!.screens as Record<string, string>

export const useBreakpoint = (breakpoint: string) => {
  const mediaQuery = useMemo(() => {
    const breakpointPx = screens[breakpoint]
    if (!breakpointPx) {
      throw new Error(`There's no '${breakpoint}' breakpoint in the tailwind config!`)
    }

    return `(min-width: ${breakpointPx})`
  }, [breakpoint])

  return useMediaQuery(mediaQuery)
}
