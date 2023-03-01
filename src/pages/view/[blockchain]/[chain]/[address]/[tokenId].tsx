import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18nextConfig from '../../../../../../next-i18next.config'
import { ViewNftToken } from '../../../../../components'
import type { AddressMetadata, InDict, NextPageWithLayout, TokenInfo } from '../../../../../models'
import { adapter } from '../../../../../services'
import { isNumberLike } from '../../../../../utils'

type TokenParams = InDict<{
  chain: string
  blockchain: string
  address: string
  tokenId: string
}>

type Props = TokenInfo & AddressMetadata

export const getServerSideProps: GetServerSideProps<Props, TokenParams> = async ({ params, locale }) => {
  const i18nBasePath = locale ? `/${locale}` : ''
  const { blockchain, chain, address, tokenId } = params ?? {}

  if (blockchain && chain && address && tokenId) {
    const [bcKey, bcConfig] = adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      const [_, nwConfig] = bcConfig.findChain(chain) ?? []

      if (nwConfig) {
        // chain is valid
        if (bcConfig.validateAddress(address)) {
          // address is valid
          const addressMetadata = await bcConfig.check(nwConfig.id, nwConfig.rpcDomain, address)

          if (addressMetadata.isNFT && isNumberLike(tokenId)) {
            // can have a tokenId and the provided tokenId is valid
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
                tokenId,
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
              destination: `${i18nBasePath}/view/${blockchain}/${chain}/${address}`,
            },
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

const ViewToken: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ViewNftToken {...props} />
}

export default ViewToken
