import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useTranslation } from 'next-i18next'
import { HeadMeta, ServerErrorSummary } from '../components'
import { PageLayoutMessage } from '../layouts'
import type { NextPageWithLayout } from '../models'
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

const NotFound: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <HeadMeta pageTitle={i18n.t('errors.notFound')} />

      <ServerErrorSummary code={404}>
        {i18n.t('errors.notFoundMessage')}
      </ServerErrorSummary>
    </>
  )
}

NotFound.Layout = PageLayoutMessage

export default NotFound
