import type { AppProps } from 'next/app'
import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import localFont from '@next/font/local'

import '../assets/css/globals.scss'

import { trpc } from '../utils/trpc'

// Optimize fonts

const Mulish = localFont({
  variable: '--font-mulish',
  src: '../assets/fonts/Mulish/Mulish-VariableFont_wght.ttf',
})
const Roboto = localFont({
  variable: '--font-roboto',
  src: [
    {
      path: '../assets/fonts/Roboto/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roboto/Roboto-Black.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const fonts = [Mulish, Roboto]

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${fonts.map(font => font.variable).join(' ')} tw-font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default trpc.withTRPC(appWithTranslation(MyApp))
