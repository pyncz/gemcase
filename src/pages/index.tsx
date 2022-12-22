import Head from 'next/head'

import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { trpc } from '../utils'
import { NextPageWithLayout } from '../models'

export const getStaticProps: GetStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en-US', [
      'common',
    ])),
  },
})

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

      {greeting}
      <h1>Some kind of explore?</h1>
    </>
  )
}

export default Home
