/* eslint-disable @typescript-eslint/no-var-requires */
const { c } = require('../helpers/color.cjs')

module.exports = ({ addComponents, addUtilities, theme }) => {
  const disabledStyles = {
    opacity: theme('opacity.muted'),
  }

  addComponents({
    '.link': {
      // defaults
      '--link-text': 'var(--c-color-dim-2)',
      '--link-text--hover': 'var(--c-link-primary-vivid)',
      '--link-border': 'var(--c-separator)',
      '--link-border--hover': 'var(--c-link-primary-vivid)',
      '--tw-text-opacity': '1',
      '--tw-border-opacity': '1',

      'display': 'inline-flex',
      'cursor': 'pointer',
      'color': c('--link-text', 'var(--tw-text-opacity)'),
      'border-bottom': `${theme('borderWidth.DEFAULT')} solid ${c('--link-border', 'var(--tw-border-opacity)')}`,
      'transitionDuration': theme('transitionDuration.normal'),

      '&:disabled': disabledStyles,
      '&[data-disabled]': disabledStyles,

      '&:hover': {
        color: c('--link-text--hover', 'var(--tw-text-opacity)'),
        borderColor: c('--link-border--hover', 'var(--tw-border-opacity)'),
        transitionDuration: theme('transitionDuration.fast'),
      },
    },
  })
  addUtilities({
    '.link-primary': {
      '--link-text': 'var(--c-link-primary)',
      '--link-text--hover': 'var(--c-link-primary-vivid)',
      '--link-border': 'var(--c-link-primary)',
      '--link-border--hover': 'var(--c-link-primary-vivid)',
    },
    '.link-regular': {
      '--link-text': 'var(--c-color-dim-2)',
      '--link-text--hover': 'var(--c-link-primary-vivid)',
      '--link-border': 'var(--c-separator)',
      '--link-border--hover': 'var(--c-link-primary-vivid)',
    },
    '.link-muted': {
      '--link-text': 'var(--c-color-dim-3)',
      '--link-text--hover': 'var(--c-color-dim-2)',
      '--link-border': 'var(--c-separator)',
      '--link-border--hover': 'var(--c-separator-vivid)',
    },
  })
}
