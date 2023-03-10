function getUiElement(theme) {
  return {
    // focus:tw-ring focus:tw-ring-accent-primary focus:tw-ring-opacity-muted

    '--ui-size': 'calc(var(--ui-scale) * var(--ui-base-size))',
    '--ui-py': 'calc(var(--ui-scale) * var(--ui-base-py))',
    '--ui-px': 'calc(var(--ui-scale) * var(--ui-base-px))',

    'height': 'var(--ui-size)',
    'padding': 'var(--ui-py) var(--ui-px)',

    'outline': 'none !important',
    'lineHeight': '1',
    'borderRadius': theme('borderRadius.DEFAULT'),
    'transitionDuration': theme('transitionDuration.normal'),
    '&:hover': {
      transitionDuration: theme('transitionDuration.fast'),
    },

    // ring
    '--tw-ring-opacity': '0',
    '--tw-ring-color': 'rgba(var(--c-ring), var(--tw-ring-opacity))',
    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    'boxShadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    '&:focus, &:focus-within': {
      '--tw-ring-opacity': 'var(--o-ring)',
    },
  }
}

module.exports = { getUiElement }
