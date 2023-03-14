/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
*/
import i18nConfig from './next-i18next.config.js'

const { i18n } = i18nConfig

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,

  images: {
    remotePatterns: [
      {
        // Images within the responses from the tokens' / contracts' metadata index
        protocol: 'https',
        hostname: 'cdn.moralis.io',
      },
      {
        // Default ipfs links' resolver
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
    ],
  },
}
export default config
