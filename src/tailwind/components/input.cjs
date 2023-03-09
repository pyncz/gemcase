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
      'color': c('--c-color-dim-1', 'var(--tw-text-opacity)'),
      'backgroundColor': c('--c-bg-dim-2', 'var(--tw-bg-opacity)'),
      'border': `${theme('borderWidth.DEFAULT')} solid ${c('--c-separator', 'var(--tw-border-opacity)')}`,
      'fontSize': 'calc(var(--ui-scale) * 1rem - 0.0625rem)',

      '&:not(button):read-only': {
        color: c('--c-color-dim-2', 'var(--tw-text-opacity)'),
      },
      '&::placeholder, &[data-placeholder]': {
        color: theme('textColor.dim.2'),
      },
      '&:disabled, &[data-disabled]': {
        'color': c('--c-color-dim-2', 'var(--tw-text-opacity)'),
        'backgroundColor': c('--c-bg-dim-1', 'var(--tw-bg-opacity)'),
        'borderColor': c('--c-separator-muted', 'var(--tw-border-opacity)'),
        '&::placeholder, &[data-placeholder]': {
          color: theme('textColor.dim.3'),
        },
      },

      '&:hover': {
        ...uiElement['&:hover'],
        borderColor: c('--c-separator-vivid', 'var(--tw-border-opacity)'),
      },
      '&:focus': {
        borderColor: c('--c-accent-primary', 'var(--tw-border-opacity)'),
      },
    },
  })
}
