import type { colorModes, themes } from '../consts'

export type Theme = typeof themes[number]

export type ColorMode = typeof colorModes[number]
export type ColorModeValue = Theme | null
