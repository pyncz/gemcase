import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { ServerErrorSummary } from '../components'
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
  return (
    <ServerErrorSummary code={404}>
      404 heh
    </ServerErrorSummary>
  )
}

NotFound.Layout = PageLayoutMessage

export default NotFound
