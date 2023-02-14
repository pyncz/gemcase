import { useMediaQuery } from './useMediaQuery'

export const usePrefersDarkMode = () => {
  return useMediaQuery('(prefers-color-scheme: dark)')
}
