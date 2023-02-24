import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ExploreForm } from '../../../components'
import type { BlockchainConfig, InDict, NextPageWithLayout } from '../../../models'
import { adapter } from '../../../services'
import i18nextConfig from '../../../../next-i18next.config'

type BlockchainParams = InDict<{
  blockchain: string
}>

export const getServerSideProps: GetServerSideProps<BlockchainConfig, BlockchainParams> = async ({ params, locale }) => {
  const { blockchain } = params ?? {}

  if (blockchain && adapter.validateBlockchain(blockchain)) {
    // blockchain is valid
    return {
      props: {
        blockchain,

        ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
          'common',
        ])),
      },
    }
  }

  return {
    notFound: true,
  }
}

const ViewBlockchain: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ExploreForm {...props} />
  )
}

export default ViewBlockchain
