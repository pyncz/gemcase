import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import type { NextPageWithLayout } from '../models'
import { PageLayoutDocs } from '../layouts'
import i18nextConfig from '../../next-i18next.config'
import { GroupContainer, HeadMeta, LocaleRadio, ThemeRadio } from '../components'

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

const Settings: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.settings.title')}
        description={i18n.t('pages.settings.description')}
      />

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
