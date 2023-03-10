/* eslint-disable @typescript-eslint/no-var-requires */
const { c } = require('../helpers/color.cjs')
const { getUiElement } = require('../helpers/ui.cjs')

module.exports = ({ addComponents, theme }) => {
  const uiElement = getUiElement(theme)

  addComponents({
    '.input': {
      // defaults
      '--tw-text-opacity': '1',
      '--tw-bg-opacity': '1',
      '--tw-border-opacity': '1',

      ...uiElement,

      'display': 'inline-flex',
      'alignItems': 'center',
      'color': c('--c-input-text', 'var(--tw-text-opacity)'),
      'backgroundColor': c('--c-input-bg', 'var(--tw-bg-opacity)'),
      'border': `${theme('borderWidth.DEFAULT')} solid ${c('--c-input-border', 'var(--tw-border-opacity)')}`,
      'fontSize': 'calc(var(--ui-scale) * 1rem - 0.0625rem)',

      '&:not(button):read-only': {
        color: c('--c-input-readonly-text', 'var(--tw-text-opacity)'),
      },
      '&::placeholder, &[data-placeholder]': {
        color: c('--c-input-placeholder', 'var(--tw-text-opacity)'),
      },
      '&:disabled, &[data-disabled]': {
        'color': c('--c-input-disabled-text', 'var(--tw-text-opacity)'),
        'backgroundColor': c('--c-input-disabled-bg', 'var(--tw-bg-opacity)'),
        'borderColor': c('--c-input-disabled-border', 'var(--tw-border-opacity)'),
        '&::placeholder, &[data-placeholder]': {
          color: c('--c-input-disabled-placeholder', 'var(--tw-text-opacity)'),
        },
      },

      '&:hover': {
        ...uiElement['&:hover'],
        borderColor: c('--c-input-border--hover', 'var(--tw-border-opacity)'),
      },
      '&:focus, &:focus-within': {
        borderColor: c('--c-input-border--focus', 'var(--tw-border-opacity)'),
      },
    },
  })
}
