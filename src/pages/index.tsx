import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18nextConfig from '../../next-i18next.config'
import type { NextPageWithLayout } from '../models'
import { ExploreForm, HeadMeta } from '../components'
import { PageLayoutMessage } from '../layouts'

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

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.index.title')}
        description={i18n.t('pages.index.description')}
      />

      <section className="tw-space-y-title">
        <h1 className="tw-mb-0">
          {i18n.t('index.title')}
        </h1>

        <ExploreForm />
      </section>
    </>
  )
}

Home.Layout = PageLayoutMessage

export default Home
