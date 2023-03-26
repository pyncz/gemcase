// @ts-check
const path = require('path')

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US'],
  },

  localePath: path.resolve('./public/locales'),
}
