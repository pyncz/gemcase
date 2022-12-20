import type { AppProps } from 'next/app'
import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import localFont from '@next/font/local'

import '../assets/css/globals.scss'

import { trpc } from '../utils'
import type { Theme } from '../contexts'
import { ColorModeContextProvider } from '../contexts'

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

type PageProps = Record<string, any> & {
  theme: Theme
}

const MyApp: AppType<PageProps> = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <ColorModeContextProvider>
      <main className={`${fonts.map(font => font.variable).join(' ')} tw-font-sans`}>
        <Component {...pageProps} />
      </main>
    </ColorModeContextProvider>
  )
}

export default trpc.withTRPC(appWithTranslation(MyApp))
