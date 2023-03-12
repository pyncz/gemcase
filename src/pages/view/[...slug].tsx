import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ExploreForm, ViewAccount, ViewCoinContract, ViewNftContract, ViewNftToken } from '../../components'
import type { AddressData, NextPageWithLayout, TokenData, Web3Data, Web3PublicConfig } from '../../models'
import i18nextConfig from '../../../next-i18next.config'
import { getParamsArray } from '../../utils'
import { getValidWeb3Info } from '../../services/getValidWeb3Params'
import { web3PublicConfig } from '../../services/web3'

type Props = Web3Data & Web3PublicConfig

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, locale }) => {
  const { slug } = params ?? {}
  const slugParams = getParamsArray(slug)

  const translations = serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
    'common',
  ])

  const pageConfig = await getValidWeb3Info(slugParams)
  if (pageConfig) {
    return {
      props: {
        ...web3PublicConfig,
        ...pageConfig,
        ...(await translations),
      } satisfies Props,
    }
  }

  return {
    notFound: true,
  }
}

const View: NextPageWithLayout<Props> = (props) => {
  const config = props as any

  // NFT
  if (config.tokenId) {
    const tokenConfig = config as TokenData
    return <ViewNftToken {...tokenConfig} />
  }

  // Address
  if (config.address) {
    const addressConfig = config as AddressData
    const {
      isContract,
      isNFT,
    } = addressConfig

    if (isContract) {
      return isNFT
        ? <ViewNftContract {...addressConfig} />
        : <ViewCoinContract {...addressConfig} />
    }

    // Just a regular address
    return <ViewAccount {...addressConfig} />
  }

  // Only bc or bc and chain are specified
  return <ExploreForm {...props} />
}

export default View
