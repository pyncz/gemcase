import type { Theme } from '../models'

export const DEFAULT_THEME: Theme = 'light'
export const THEME_LOCAL_STORAGE_KEY = 'color-mode'

export const themes = ['light', 'dark', 'black'] as const
export const colorModes = ['system', ...themes] as const
