import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18nextConfig from '../../../../../next-i18next.config'
import { ExploreForm } from '../../../../components'
import type { ChainInfo, InDict, NextPageWithLayout } from '../../../../models'
import { adapter } from '../../../../services'

type ChainParams = InDict<{
  chain: string
  blockchain: string
}>

export const getServerSideProps: GetServerSideProps<ChainInfo, ChainParams> = async ({ params, locale }) => {
  const i18nBasePath = locale ? `/${locale}` : ''
  const { blockchain, chain } = params ?? {}

  if (blockchain && chain) {
    const [bcKey, bcConfig] = adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      const [_, nwConfig] = bcConfig.findChain(chain) ?? []

      if (nwConfig) {
        // there's such chain among the chains of the blockchain
        return {
          props: {
            blockchain: bcKey,
            blockchainMetadata: {
              label: bcConfig.label,
              logo: bcConfig.logo ?? null,
            },
            chainId: nwConfig.id,
            chainMetadata: {
              label: nwConfig.label,
              logo: nwConfig.logo ?? null,
            },

            ...(await serverSideTranslations(locale ?? nextI18nextConfig.i18n.defaultLocale, [
              'common',
            ])),
          },
        }
      }

      return {
        redirect: {
          statusCode: 307,
          // TODO: i18n: Check if i18n fills the base Url
          destination: `${i18nBasePath}/view/${blockchain}`,
        },
      }
    }
  }

  return {
    notFound: true,
  }
}

const ViewChain: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ExploreForm {...props} />
  )
}

export default ViewChain
