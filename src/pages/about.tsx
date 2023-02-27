import Head from 'next/head'

import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { Icon } from '@iconify-icon/react'

import githubIcon from '@iconify-icons/ion/logo-github-outline'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { ExternalLink, PromoCard } from '../components'
import { PageLayoutDocs } from '../layouts'
import type { NextPageWithLayout } from '../models'
import { getYearsFrom } from '../utils'
import i18nextConfig from '../../next-i18next.config'

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

const About: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()
  const years = getYearsFrom(2023)

  return (
    <>
      <Head>
        <title>{i18n.t('pages.about.title')}</title>
        <meta property="og:title" content={`gemcase | ${i18n.t('pages.about.title')}`} key="title" />
        <meta name="description" content={i18n.t('pages.about.description')} key="description" />
      </Head>

      <h1>
        {i18n.t('pages.about.title')}
      </h1>

      <div className="tw-space-y-list">
        <div className="tw-w-full tw-grid tw-gap-6 tw-grid-cols-[minmax(0,1fr)] lg:tw-grid-cols-[repeat(3,minmax(0,1fr))]">
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
        </div>

        <div className="tw-text-xs tw-text-dim-3 tw-space-x-0.5">
          <span>{years}.</span>
          <span>{i18n.t('madeBy')}</span>
          <ExternalLink
            href="https://github.com/pyncz"
          ><Icon icon={githubIcon} className="tw-relative tw-top-0.5 tw-pr-px" />
            pyncz</ExternalLink>
        </div>
      </div>
    </>
  )
}

About.Layout = PageLayoutDocs

export default About
