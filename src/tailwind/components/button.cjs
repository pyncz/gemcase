/* eslint-disable @typescript-eslint/no-var-requires */
const { c } = require('../helpers/color.cjs')
const { getUiElement } = require('../helpers/ui.cjs')

module.exports = ({ addComponents, addUtilities, theme }) => {
  const uiElement = getUiElement(theme)

  const disabledStyles = {
    opacity: theme('opacity.muted'),
    pointerEvents: 'none',
  }

  addComponents({
    '.button': {
      // defaults
      '--tw-text-opacity': '1',
      '--tw-bg-opacity': '1',

      ...uiElement,

      'cursor': 'pointer',
      'gap': theme('gap.1'),
      'display': 'inline-flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'color': c('--button-text', 'var(--tw-text-opacity)'),
      'backgroundColor': c('--button-bg', 'var(--tw-bg-opacity)'),
      'fontWeight': theme('fontWeight.medium'),
      'fontSize': 'calc(var(--ui-scale) * 1rem)',

      '&:disabled': disabledStyles,
      '&[data-disabled]': disabledStyles,

      '&:hover': {
        ...uiElement['&:hover'],
        backgroundColor: c('--button-bg--hover', 'var(--tw-bg-opacity)'),
      },
      '&:active': {
        transform: `scale(${theme('scale.click')})`,
      },
    },
  })
  addUtilities({
    '.button-primary': {
      '--button-text': 'var(--c-button-primary-color)',
      '--button-bg': 'var(--c-button-primary-bg)',
      '--button-bg--hover': 'var(--c-button-primary-bg-vivid)',
    },
    '.button-secondary': {
      '--button-text': 'var(--c-button-secondary-color)',
      '--button-bg': 'var(--c-button-secondary-bg)',
      '--button-bg--hover': 'var(--c-button-secondary-bg-vivid)',
    },
  })
  addUtilities({
    '.button-icon': {
      '--button-offset': '0.25rem',
      'padding': 'var(--ui-py)',
      'height': 'calc(var(--ui-size) + 2 * var(--button-offset))',
      'width': 'calc(var(--ui-size) + 2 * var(--button-offset))',
      'fontSize': 'calc(var(--ui-scale) * 1rem + 0.25rem)',
      'borderRadius': theme('borderRadius.full'),
    },
  })
}
