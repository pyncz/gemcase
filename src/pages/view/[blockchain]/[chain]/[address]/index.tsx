import type { Nullable } from '@voire/type-utils'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18nextConfig from '../../../../../../next-i18next.config'
import { AddressRepresentation } from '../../../../../components/AddressRepresentation'
import type { AddressConfig, AddressMetadata, InDict, NextPageWithLayout } from '../../../../../models'
import { adapter } from '../../../../../services'
import { stringify } from '../../../../../utils'

type AddressParams = InDict<{
  chain: string
  blockchain: string
  address: string
}>

interface Props extends AddressConfig, AddressMetadata {
  metadata: Nullable<string> // Serialized metadata
  address: string
}

export const getServerSideProps: GetServerSideProps<Props, AddressParams> = async ({ params, locale }) => {
  const i18nBasePath = locale ? `/${locale}` : ''
  const { blockchain, chain, address } = params ?? {}

  if (blockchain && chain && address) {
    const [bcKey, bcConfig] = adapter.findBlockchain(blockchain) ?? []

    if (bcKey && bcConfig) {
      // blockchain is valid
      const [_, nwConfig] = bcConfig.findChain(chain) ?? []

      if (nwConfig && bcConfig.validateAddress(address)) {
        // chain and address are valid
        const addressMetadata = await bcConfig.check(nwConfig.id, nwConfig.infuraDomain, address)

        const contractMetadata = addressMetadata.isContract
          ? await bcConfig.getContractMetadata(
            nwConfig.id,
            nwConfig.infuraDomain,
            address,
          )
          : null

        return {
          props: {
            blockchain: bcKey,
            chainId: nwConfig.id,
            address,
            ...addressMetadata,
            metadata: stringify(contractMetadata),

            ...(await serverSideTranslations(locale ?? nextI18nextConfig.i18n.defaultLocale, [
              'common',
            ])),
          } satisfies Props,
        }
      }

      return {
        redirect: {
          statusCode: 307,
          destination: `/view/${blockchain}/${chain}`,
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

  return {
    notFound: true,
  }
}

const ViewAddress: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    isCollectibleNFT,
    isContract,
    isNFT,

    metadata,
  } = props

  if (isContract) {
    if (isNFT) {
      return (
        <div>
          <h1>An NFT address</h1>
          {isCollectibleNFT ? <small>collectible</small> : null}
          <AddressRepresentation {...props} />
          <div>
            Metadata:
            <code>
              {metadata}
            </code>
          </div>
        </div>
      )
    }

    // A coin contract
    return (
      <div>
        <h1>A coin address</h1>
        <AddressRepresentation {...props} />
        <div>
          Metadata:
          <code>
            {metadata}
          </code>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Just a regular address</h1>
      <AddressRepresentation {...props} />
    </div>
  )
}

export default ViewAddress
