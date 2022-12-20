import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useContext } from 'react'
import { ColorModeContext, themes } from '../contexts'

export const ThemeSwitcher: FC = () => {
  const { switchColorMode } = useContext(ColorModeContext)
  const { i18n } = useTranslation()

  return (
    <div className="tw-flex tw-gap-4">
      <button onClick={() => switchColorMode(null)}>{i18n.t('theme.system')}</button>
      {themes.map(theme => (
        <button key={theme} onClick={() => switchColorMode(theme)}>
          {i18n.t(`theme.${theme}`)}
        </button>
      ))}
    </div>
  )
}
