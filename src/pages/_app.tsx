import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import localFont from '@next/font/local'

import '../assets/css/globals.scss'

import { Provider } from 'react-redux'
import { trpc } from '../utils'
import { ColorModeContextProvider } from '../contexts'
import { ErrorBoundary } from '../components'
import { LayoutBase } from '../layouts'
import type { AppPropsWithLayout } from '../models'

import { store } from '../stores'

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

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Get per-page layout or use a default one
  const Layout = Component.Layout ?? LayoutBase

  return (
    <ErrorBoundary>{/* In case something happens above the Component's ErrorBoundary */}
      <ColorModeContextProvider>
        <Provider store={store}>
          <main className={`${fonts.map(font => font.variable).join(' ')} tw-font-main`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </Provider>
      </ColorModeContextProvider>
    </ErrorBoundary>
  )
}

export default trpc.withTRPC(appWithTranslation(MyApp))
