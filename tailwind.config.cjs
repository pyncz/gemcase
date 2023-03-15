/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

const { c, co } = require('./src/tailwind/helpers/color.cjs')
const { fill } = require('./src/tailwind/helpers/fill.cjs')

function slideKeyframes(offset, axis) {
  const transform = `translate${axis}`
  return {
    '0%': {
      opacity: 0,
      transform: `scale(0.5) ${transform}(${offset}px)`,
    },
    '100%': {
      opacity: 1,
      transform: `scale(1) ${transform}(0)`,
    },
  }
}

const sansSerif = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'sans-serif',
]

const textColors = {
  base: co('--c-color-base'),
  dim: fill(3, i => co(`--c-color-dim-${i}`)),
}

const illustrationColors = {
  base: co('--c-i-base'),
  accent: fill(6, i => co(`--c-i-accent-${i}`)),
}

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  prefix: 'tw-',
  safelist: [
    'light-mode',
    'dark-mode',
    'black-mode',
    { pattern: /^tw-ui-.+$/ },
    { pattern: /^tw-logo-.+$/ },
  ],
  theme: {
    data: {
      highlighted: 'highlighted',
      disabled: 'disabled',
      placeholder: 'placeholder',
    },

    // structure
    fontSize: {
      'unset': 'unset',
      'inherit': 'inherit',
      // Absolute
      '2xs': ['0.675rem', { lineHeight: '0.675rem', letterSpacing: '.05em' }],
      'xs': '0.75rem',
      'sm': '0.875rem',
      'normal': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      // Relative
      '1/2': '0.5em',
      '5/8': '0.625em',
      '3/4': '0.75em',
      '7/8': '0.875em',
      '9/8': '1.125em',
      '5/4': '1.25em',
      '3/2': '1.5em',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
      },
    },
    gridTemplateColumns: {
      cards: 'repeat(auto-fill, minmax(14rem, 1fr))',
    },
    colors: {
      black: co('--c-black'),
      white: co('--c-white'),
      accent: {
        'primary': co('--c-accent-primary'),
        'primary-lighten': co('--c-accent-primary-lighten'),
        'primary-darken': co('--c-accent-primary-darken'),
        'primary-vivid': co('--c-accent-primary-vivid'),
        'secondary': co('--c-accent-secondary'),
        'secondary-lighten': co('--c-accent-secondary-lighten'),
        'secondary-darken': co('--c-accent-secondary-darken'),
        'secondary-vivid': co('--c-accent-secondary-vivid'),
      },
      state: {
        error: co('--c-state-error'),
        warning: co('--c-state-warning'),
      },
    },
    fontFamily: {
      sans: sansSerif, // without any loaded font
      header: ['var(--font-mulish)', 'Mulish', ...sansSerif],
      main: ['var(--font-roboto)', 'Roboto', ...sansSerif],
      mono: ['monospace'],
    },
    lineHeight: {
      1: 1,
      xs: 1.1,
      sm: 1.15,
    },

    // skins
    textColor: theme => ({
      ...theme('colors'),
      ...textColors,
      transparent: 'transparent',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'base': co('--c-bg-base'),
      'illustration-el': co('--c-illustration-el'),
      'illustration-bg': co('--c-illustration-bg'),
      'card': co('--c-bg-card'),
      'viewport': co('--c-bg-viewport'),
      'dim': fill(3, i => co(`--c-bg-dim-${i}`)),
      'text': textColors,
    }),
    borderColor: theme => ({
      ...theme('colors'),
      separator: {
        DEFAULT: co('--c-separator'),
        muted: co('--c-separator-muted'),
        vivid: co('--c-separator-vivid'),
      },
    }),
    borderRadius: {
      sm: 'var(--r-sm)',
      DEFAULT: 'var(--r-DEFAULT)',
      lg: 'var(--r-lg)',
      xl: 'var(--r-xl)',
      full: '9999px',
    },
    scale: {
      0: '0',
      50: '0.5',
      click: '0.975',
      normal: '1',
    },
    fill: theme => ({
      ...theme('backgroundColor'),
      illustration: illustrationColors,
    }),
    stroke: theme => ({
      ...theme('borderColor'),
      illustration: illustrationColors,
    }),
    opacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      muted: '0.5',
      soft: '0.8',
      full: '1',
    },
    backgroundOpacity: theme => ({
      ...theme('opacity'),
      modal: 'var(--o-modal-overlay)',
    }),
    boxShadow: {
      none: 'none',

      card: 'var(--s-card)',

      // shadows for dialogs, popups etc
      popup: '0 0.75rem 1.75rem -1.75rem rgba(var(--c-color-base), 0.5)',
      modal: '0 0 2rem -1.75rem rgb(var(--c-color-base))',
      highlight: '0 0 1rem rgba(var(--c-accent-primary), 0.1)',
    },
    dropShadow: {
      title: 'var(--s-title)',
      glow: `0 0 0.0625em ${c('--c-color-base', 'var(--o-glow)')}`,
    },
    transitionDuration: {
      fast: '150ms',
      normal: '300ms',
    },
    zIndex: {
      muted: '-1',
      1: '1',
      modal: '100',
    },
    extend: {
      screens: {
        '2xs': '320px',
        'xs': '400px',
      },
      blur: {
        px: '1px',
        xs: '2px',
      },
      spacing: {
        // for height / width
        sidebar: 'var(--h-sidebar)',
        // for spacing
        list: '1.25rem',
        title: '2.5rem',
        field: '0.25rem',
        fields: '0.75rem',
        form: '1.5rem',
        // for offset
        ch: '1ch',
        em: '1em',
      },
      backgroundSize: {
        full: '100%',
        x2: '200%',
        x4: '400%',
      },
      rotate: {
        30: '30deg',
        60: '60deg',
      },
      transitionTimingFunction: {
        bezier: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        slideDown: slideKeyframes(-10, 'Y'),
        slideUp: slideKeyframes(10, 'Y'),
        slideLeft: slideKeyframes(10, 'Y'),
        slideRight: slideKeyframes(-10, 'Y'),

        shake: {
          '26%, 74%': { transform: 'rotate(0) scale(1)' },
          '32%, 68%': { transform: 'rotate(4deg) scale(1)' },
          '38%, 62%': { transform: 'rotate(-12deg) scale(0.975)' },
          '44%, 56%': { transform: 'rotate(12deg) scale(1.025)' },
          '50%': { transform: 'rotate(-20deg) scale(1.05)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: theme => ({
        // slow fading out and in, e.g. gradient lights on the home page
        damping: 'tw-pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        // e.g. tooltips animations
        slideDown: `slideDown ${theme('transitionDuration.fast')} ${theme('transitionTimingFunction.bezier')}`,
        slideUp: `slideUp ${theme('transitionDuration.fast')} ${theme('transitionTimingFunction.bezier')}`,
        slideLeft: `slideLeft ${theme('transitionDuration.fast')} ${theme('transitionTimingFunction.bezier')}`,
        slideRight: `slideRight ${theme('transitionDuration.fast')} ${theme('transitionTimingFunction.bezier')}`,

        // e.g. connect button on hover
        shake: 'shake 1.5s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      }),
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    // Utils
    plugin(require('./src/tailwind/headers.cjs')),
    plugin(require('./src/tailwind/utils/layouts.cjs')),
    plugin(require('./src/tailwind/utils/mask.cjs')),
    // Components
    plugin(require('./src/tailwind/components/link.cjs')),
    plugin(require('./src/tailwind/components/button.cjs')),
    plugin(require('./src/tailwind/components/input.cjs')),

    ({ addVariant }) => {
      addVariant('checked', '&[data-state="checked"]')
      addVariant('child', '& > *')
    },

    ({ addUtilities, matchUtilities, addComponents, addBase, theme }) => {
      addBase({
        hr: {
          width: '100%',
          borderColor: theme('borderColor.separator.DEFAULT'),
        },
      })

      addUtilities({
        '.py-section': {
          'paddingTop': '6rem',
          'paddingBottom': '4rem',
          '@screen md': {
            paddingTop: '5rem',
            paddingBottom: '6rem',
          },
        },
        '.px-container': {
          'paddingLeft': '1rem',
          'paddingRight': '1rem',
          '@screen sm': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
          '@screen md': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
        '.navlink-bg': {
          background: 'radial-gradient(50% 50% at center, rgb(var(--c-navlink)), transparent)',
        },
        '.duration-nobg-fast': {
          transition: 'all 150ms, background 0s',
        },
        '.duration-nobg-normal': {
          transition: 'all 300ms, background 0s',
        },
      })
      addComponents({
        '.border-avatar': {
          '--tw-border-opacity': theme('opacity.muted'),
          'border': `${theme('borderWidth.DEFAULT')} solid ${c('--c-separator-vivid', 'var(--tw-border-opacity)')}`,
        },
      })
      addUtilities({
        '.bg-accent': {
          backgroundImage: 'linear-gradient(135deg, #56FF47 8%, #00FFE0 88%)',
        },
        '.shadow-separator': {
          boxShadow: `0 0 0 1px ${theme('borderColor.separator.DEFAULT')}`,
        },
        '.shadow-separator-muted': {
          boxShadow: `0 0 0 1px ${theme('borderColor.separator.muted')}`,
        },
        '.shadow-separator-vivid': {
          boxShadow: `0 0 0 1px ${theme('borderColor.separator.vivid')}`,
        },
        '.border-container': {
          '--tw-border-opacity': '1',
          'border': `${theme('borderWidth.DEFAULT')} solid ${c('--c-separator-muted', 'var(--tw-border-opacity)')}`,
          'transitionDuration': theme('transitionDuration.normal'),
          '&:hover': {
            borderColor: c('--c-separator', 'var(--tw-border-opacity)'),
            transitionDuration: theme('transitionDuration.fast'),
          },
        },
      })

      const size = value => ({
        height: value,
        minHeight: value,
        width: value,
        minWidth: value,
      })

      matchUtilities(
        {
          size,
          circle: value => ({
            ...size(value),
            borderRadius: theme('borderRadius.full'),
          }),
        },
        { values: theme('height') },
      )

      matchUtilities(
        { logo: size },
        {
          values: {
            xs: '1.5rem',
            sm: '2.25rem',
            md: '3rem',
            lg: '3.75rem',
            xl: '4.5rem',
          },
        },
      )

      matchUtilities(
        {
          ui: value => ({
            '--ui-scale': value,
          }),
        },
        {
          values: {
            xs: '0.75',
            sm: '0.875',
            md: '1',
            lg: '1.125',
            xl: '1.25',
          },
        },
      )

      addUtilities({
        '.mirror-x': {
          '--tw-scale-x': '-1',
          'transform': 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.mirror-y': {
          '--tw-scale-y': '-1',
          'transform': 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
      })

      addComponents({
        '.promo-card': {
          '&::before': {
            maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), #fff, rgba(255, 255, 255, 0.3))',
          },
          'svg': {
            maskImage: 'radial-gradient(50% 50% at center, #fff, transparent)',
          },
        },
      })
    },
  ],
}
