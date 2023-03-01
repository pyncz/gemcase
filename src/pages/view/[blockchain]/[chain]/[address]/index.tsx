import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18nextConfig from '../../../../../../next-i18next.config'
import { ViewAccount, ViewCoinContract, ViewNftContract } from '../../../../../components'
import type { AddressInfo, AddressMetadata, InDict, NextPageWithLayout } from '../../../../../models'
import { adapter } from '../../../../../services'

type AddressParams = InDict<{
  chain: string
  blockchain: string
  address: string
}>

type Props = AddressInfo & AddressMetadata

export const getServerSideProps: GetServerSideProps<Props, AddressParams> = async ({ params, locale }) => {
  const i18nBasePath = locale ? `/${locale}` : ''
  const { blockchain, chain, address } = params ?? {}

  if (blockchain && chain && address) {
    const [bcKey, bcConfig] = adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      const [_, nwConfig] = bcConfig.findChain(chain) ?? []

      if (nwConfig) {
        // chain is valid
        if (bcConfig.validateAddress(address)) {
          // address is valid
          const addressMetadata = await bcConfig.check(nwConfig.id, nwConfig.rpcDomain, address)

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
              address,
              ...addressMetadata,

              ...(await serverSideTranslations(locale ?? nextI18nextConfig.i18n.defaultLocale, [
                'common',
              ])),
            } satisfies Props,
          }
        }

        return {
          redirect: {
            statusCode: 307,
            destination: `${i18nBasePath}/view/${blockchain}/${chain}`,
          },
        }
      }

      return {
        redirect: {
          statusCode: 307,
          destination: `${i18nBasePath}/view/${blockchain}`,
        },
      }
    }
  }

  return {
    notFound: true,
  }
}

const ViewAddress: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    isContract,
    isNFT,
  } = props

  if (isContract) {
    return isNFT
      ? <ViewNftContract {...props} />
      : <ViewCoinContract {...props} />
  }

  // Just a regular address
  return <ViewAccount {...props} />
}

export default ViewAddress
