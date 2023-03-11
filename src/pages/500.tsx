import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { HeadMeta, ServerErrorSummary } from '../components'
import { PageLayoutMessage } from '../layouts'
import type { NextPageWithLayout, Web3PublicConfig } from '../models'
import i18nextConfig from '../../next-i18next.config'
import { web3PublicConfig } from '../services/web3'

type Props = Web3PublicConfig

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => {
  return {
    props: {
      ...web3PublicConfig,
      ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
        'common',
      ])),
    },
  }
}

const InternalServerError: NextPageWithLayout<Props> = (props) => {
  const { i18n } = useTranslation()

  return (
    <>
      <HeadMeta pageTitle={i18n.t('errors.serverError')} />

      <ServerErrorSummary code={500} {...props}>
        {i18n.t('errors.serverErrorMessage')}
      </ServerErrorSummary>
    </>
  )
}

InternalServerError.Layout = PageLayoutMessage

export default InternalServerError
