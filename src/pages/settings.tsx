import Head from 'next/head'
import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import type { NextPageWithLayout } from '../models'
import { PageLayoutDocs } from '../layouts'
import i18nextConfig from '../../next-i18next.config'
import { GroupContainer, LocaleRadio, ThemeRadio } from '../components'

export const getStaticProps: GetStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
      'common',
    ])),
  },
})

const Settings: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <Head>
        <title>{i18n.t('pages.about.title')}</title>
        <meta property="og:title" content={`gemcase | ${i18n.t('pages.settings.title')}`} key="title" />
        <meta name="description" content={i18n.t('pages.settings.description')} key="description" />
      </Head>

      <h1>
        {i18n.t('pages.settings.title')}
      </h1>

      <div className="tw-space-y-list">
        <GroupContainer title={i18n.t('theme._')}>
          <ThemeRadio />
        </GroupContainer>

        <GroupContainer title={i18n.t('locale._')}>
          <LocaleRadio />
        </GroupContainer>
      </div>
    </>
  )
}

Settings.Layout = PageLayoutDocs

export default Settings
