function getUiElement(theme) {
  return {
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
  }
}

module.exports = { getUiElement }
