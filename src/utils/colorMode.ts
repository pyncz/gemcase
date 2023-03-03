import type { ColorMode, ColorModeValue } from '../models'

export const getColorModeValue = (colorMode: ColorMode): ColorModeValue => {
  return colorMode === 'system' ? null : colorMode
}
