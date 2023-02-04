import { useEffect, useState } from 'react'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.cjs'

const fullConfig = resolveConfig(tailwindConfig)
const screens = fullConfig.theme!.screens as Record<string, string>

export const useBreakpoint = (breakpoint: string) => {
  const [gteBreakpoint, setGteBreakpoint] = useState(false)

  useEffect(() => {
    const breakpointPx = screens[breakpoint]
    if (!breakpointPx) {
      throw new Error(`There's no '${breakpoint}' breakpoint in the tailwind config!`)
    }

    const media = matchMedia(`(min-width: ${breakpointPx})`)
    const updateMatch = () => {
      setGteBreakpoint(media.matches)
    }

    // init value
    updateMatch()

    // subscribe on media query results' changes
    media.addEventListener('change', updateMatch)
    return () => {
      media.removeEventListener('change', updateMatch)
    }
  }, [breakpoint])

  return gteBreakpoint
}
