import { type NextPage } from 'next'
import Head from 'next/head'

import type {
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { PromoCard } from '../components'
import { LayoutDefault } from '../layouts'

interface Props {
  // Add custom props here
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en-US', [
      'common',
    ])),
  },
})

const About: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <Head>
        <title>{i18n.t('pages.about.title')}</title>
        <meta property="og:title" content={`gemcase | ${i18n.t('pages.about.title')}`} key="title" />
        <meta name="description" content={i18n.t('pages.about.description')} key="description" />
      </Head>

      <LayoutDefault>
        <PromoCard
          image="networks"
          title={i18n.t('promo.networks.title')}
          description={i18n.t('promo.networks.description')}
        />
        <PromoCard
          image="addresses"
          title={i18n.t('promo.addresses.title')}
          description={i18n.t('promo.addresses.description')}
        />
        <PromoCard
          image="assets"
          title={i18n.t('promo.assets.title')}
          description={i18n.t('promo.assets.description')}
        />
      </LayoutDefault>
    </>
  )
}

export default About
