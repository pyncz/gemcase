import type { Optional } from '@voire/type-utils'
import { useEffect, useState } from 'react'

export const useMediaQuery = (query?: string) => {
  const [matches, setMatches] = useState<Optional<boolean>>()

  useEffect(() => {
    if (query) {
      const media = matchMedia(query)
      const updateMatch = () => {
        setMatches(media.matches)
      }

      // init value
      updateMatch()

      // subscribe on media query results' changes
      media.addEventListener('change', updateMatch)
      return () => {
        media.removeEventListener('change', updateMatch)
      }
    }
  }, [query])

  return matches
}
