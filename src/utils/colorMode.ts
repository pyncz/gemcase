import type { ColorMode, ColorModeValue } from '../contexts'

export const getColorModeValue = (colorMode: ColorMode): ColorModeValue => {
  return colorMode === 'system' ? null : colorMode
}
