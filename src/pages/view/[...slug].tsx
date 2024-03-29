import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ExploreForm, ViewAccount, ViewNftContract, ViewNftToken, ViewToken } from '../../components'
import type { NextPageWithLayout, Web3Data, Web3PublicConfig } from '../../models'
import i18nextConfig from '../../../next-i18next.config'
import { getParamsArray } from '../../utils'
import { getValidWeb3Data } from '../../services/getValidWeb3Data'
import { web3PublicConfig } from '../../services/web3Adapter'

type Props = Web3Data & Web3PublicConfig

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, locale }) => {
  const { slug } = params ?? {}
  const slugParams = getParamsArray(slug)

  const pageWeb3Data = await getValidWeb3Data(...slugParams)
  if (pageWeb3Data) {
    return {
      props: {
        ...web3PublicConfig,
        ...pageWeb3Data,
        ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
          'common',
        ])),
      } satisfies Props,
    }
  }

  return {
    notFound: true,
  }
}

const View: NextPageWithLayout<Props> = (props: Props) => {
  const { is } = props

  if (is === 'nft') {
    return (
      // NFT
      <ViewNftToken {...props} />
    )
  } else if (is === 'nftContract') {
    return (
      // NFT Contract address
      <ViewNftContract {...props} />
    )
  } else if (is === 'coinContract') {
    return (
      // Coin Contract address
      <ViewToken {...props} />
    )
  } else if (is === 'account') {
    return (
      // Just a regular address
      <ViewAccount {...props} />
    )
  } else {
    return (
      // Only bc or bc and chain are specified
      <ExploreForm {...props} />
    )
  }
}

export default View
