import Head from 'next/head'

import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18nextConfig from '../../next-i18next.config'
import { trpc } from '../utils'
import type { NextPageWithLayout } from '../models'

export const getStaticProps: GetStaticProps = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
        'common',
      ])),
    },
  }
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()

  const greeting = trpc.example.hello.useQuery({ text: 'fsdf' }).data?.greeting ?? ''

  return (
    <>
      <Head>
        <title>{i18n.t('pages.index.title')}</title>
        <meta property="og:title" content={`gemcase | ${i18n.t('pages.index.title')}`} key="title" />
        <meta name="description" content={i18n.t('pages.index.description')} key="description" />
      </Head>

      <div className="tw-px-container">
        {greeting}
        <h1>Some kind of explore?</h1>
      </div>
    </>
  )
}

export default Home
