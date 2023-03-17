import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import localFont from '@next/font/local'

import '../assets/css/globals.scss'

import { Provider as ReduxProvider } from 'react-redux'
import { useEffect } from 'react'
import type { SizeExtra } from '@voire/type-utils'
import { trpcHooks } from '../utils'
import { ColorModeProvider, ScaleUiProvider } from '../contexts'
import { ErrorBoundary } from '../components'
import { LayoutBase } from '../layouts'
import type { AppPropsWithLayout } from '../models'

import { store } from '../stores'
import { useBreakpoint } from '../hooks'

// Optimize fonts
const Mulish = localFont({
  variable: '--font-mulish',
  src: '../assets/fonts/Mulish/Mulish-Bold.ttf',
  weight: '700',
})
const Roboto = localFont({
  variable: '--font-roboto',
  style: 'normal',
  src: [
    {
      path: '../assets/fonts/Roboto/Roboto-Light.ttf',
      weight: '300',
    },
    {
      path: '../assets/fonts/Roboto/Roboto-Regular.ttf',
      weight: '400',
    },
    {
      path: '../assets/fonts/Roboto/Roboto-Black.ttf',
      weight: '700',
    },
  ],
})

const fonts = [Mulish, Roboto]

const App: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Get per-page layout or use a default one
  const Layout = Component.Layout ?? LayoutBase

  const gteXsScreen = useBreakpoint('xs')
  const scale: SizeExtra = gteXsScreen ? 'md' : 'lg'

  useEffect(() => {
    const root = document.getElementsByTagName('html')[0]!
    root.classList.add(...fonts.map(font => font.variable))
  }, [])

  return (
    <main>
      <ErrorBoundary>{/* In case something happens above the Component's ErrorBoundary */}
        <ColorModeProvider>
          <ScaleUiProvider size={scale}>
            <ReduxProvider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ReduxProvider>
          </ScaleUiProvider>
        </ColorModeProvider>
      </ErrorBoundary>
    </main>
  )
}

export default trpcHooks.withTRPC(appWithTranslation(App))
