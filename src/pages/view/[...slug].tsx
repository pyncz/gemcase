import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ExploreForm, ViewAccount, ViewCoinContract, ViewNftContract, ViewNftToken } from '../../components'
import type { AddressInfo, NextPageWithLayout, TokenInfo, Web3Params } from '../../models'
import i18nextConfig from '../../../next-i18next.config'
import { getParamsArray } from '../../utils'
import { getValidWeb3Params } from '../../services'

type Props = Web3Params

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, locale }) => {
  const { slug } = params ?? {}
  const slugParams = getParamsArray(slug)

  const translations = serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
    'common',
  ])

  const pageConfig = await getValidWeb3Params(slugParams)
  if (pageConfig) {
    return {
      props: {
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
    const tokenConfig = props as TokenInfo
    return <ViewNftToken {...tokenConfig} />
  }

  // Address
  if (config.address) {
    const addressConfig = props as AddressInfo
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
