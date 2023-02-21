// tw-text-dim-3 tw-text-xs

import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useContext } from 'react'
import { colorModes } from '../consts'
import { ColorModeContext } from '../contexts'
import type { ColorMode } from '../models'
import { getColorModeValue } from '../utils'
import { RadioGroup } from './ui'

export const ThemeRadio: FC = () => {
  const { switchColorMode, colorMode, fallbackTheme } = useContext(ColorModeContext)
  const { i18n } = useTranslation()

  return (
    <RadioGroup<ColorMode, ColorMode>
      value={colorMode ?? 'system'}
      options={colorModes.map(x => x)}
      getValue={option => option}
      onValueChange={(colorMode) => {
        switchColorMode(getColorModeValue(colorMode))
      }}
      renderOption={(colorMode, { id }) => {
        return (
          <label htmlFor={id} className="tw-relative">
            <span className="tw-font-medium tw-block">
              {i18n.t(`theme.${colorMode}`)}
            </span>
            {
              colorMode === 'system'
                ? (
                  // Tell which theme is "system"
                  <span className="tw-block tw-text-dim-3 tw-text-xs">
                    {i18n.t(`theme.${fallbackTheme}`)}
                  </span>
                  )
                : null
            }
          </label>
        )
      }}
    />
  )
}
