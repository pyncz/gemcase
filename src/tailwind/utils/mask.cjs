module.exports = ({ theme, addUtilities, matchUtilities }) => {
  // Add utils for setting of the `mask-image` prop
  matchUtilities({
    mask: value => ({
      'maskImage': value,
      // default vars
      '--tw-mask-direction': 'to bottom',
      '--tw-mask-shape': '',
      '--tw-mask-size': 'closest-side',
      '--tw-mask-at': 'center',
      '--tw-mask-position': 'var(--tw-mask-shape) var(--tw-mask-size) at var(--tw-mask-at)',
      '--tw-mask-from-opacity': '1',
      '--tw-mask-from': 'rgba(var(--c-black), var(--tw-mask-from-opacity))',
      '--tw-mask-to-opacity': '0',
      '--tw-mask-to': 'rgba(var(--c-black), var(--tw-mask-to-opacity))',
      '--tw-mask-stops': 'var(--tw-mask-from), var(--tw-mask-to)',
    }),
  }, {
    values: {
      linear: 'linear-gradient(var(--tw-mask-direction), var(--tw-mask-stops))',
      radial: 'radial-gradient(var(--tw-mask-position), var(--tw-mask-stops))',
    },
  })
  // - direction
  matchUtilities({
    'mask-dir': value => ({
      '--tw-mask-direction': value,
    }),
  }, {
    values: {
      'to-b': 'to bottom',
      'to-r': 'to right',
      'to-l': 'to left',
      'to-t': 'to top',
    },
  })
  // - shape
  addUtilities({
    'mask-shape-circle': {
      '--tw-mask-shape': 'circle',
    },
    'mask-shape-ellipse': {
      '--tw-mask-shape': 'ellipse',
    },
  })
  // - size
  matchUtilities({
    'mask-size': value => ({
      '--tw-mask-size': value,
    }),
    'values': {
      cover: 'farthest-corner',
      contain: 'closest-side',
      corner: 'closest-corner',
      stick: 'farthest-side',
    },
  })
  // - position
  matchUtilities({
    'mask-at': value => ({
      '--tw-mask-at': value,
    }),
  }, {
    values: {
      center: 'center',
      t: 'top',
      tl: 'top left',
      tr: 'top right',
      b: 'bottom',
      bl: 'bottom left',
      br: 'bottom right',
      l: 'left',
      r: 'right',
    },
  })
  // - stops
  matchUtilities({
    'mask-from': value => ({
      '--tw-mask-from-opacity': value,
    }),
    'mask-to': value => ({
      '--tw-mask-to-opacity': value,
    }),
    'mask-via': value => ({
      '--tw-mask-stops': `var(--tw-mask-from), rgba(var(--c-black), ${value}), var(--tw-mask-to)`,
    }),
  }, { values: theme('opacity') })
}
