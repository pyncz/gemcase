/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
*/
import iconsPlugin from 'unplugin-icons/webpack'
import i18nConfig from './next-i18next.config.js'

const { i18n } = i18nConfig

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  webpack(config) {
    config.plugins.push(
      iconsPlugin({
        compiler: 'jsx',
        jsx: 'react',
      }),
    )

    return config
  },
}
export default config
