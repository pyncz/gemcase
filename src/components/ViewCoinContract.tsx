import type { FC } from 'react'
import Image from 'next/image'
import { LayoutSide } from '../layouts'
import type { AddressConfig } from '../models'
import { stringify, trpc } from '../utils'
import { AddressRepresentation } from './AddressRepresentation'
import { Skeleton, Tag } from './ui'

interface Props extends AddressConfig {
  standard?: string
}

export const ViewCoinContract: FC<Props> = (props) => {
  const {
    blockchain,
    chainId,
    address,
    standard,
  } = props

  const {
    isLoading,
    data: metadata,
  } = trpc.metadata.getCoinContractMetadata.useQuery({ blockchain, chainId, address })

  return (
    <LayoutSide>
      <section className="tw-px-container tw-py-section">
        <h1>
          <Skeleton.Root isLoading={isLoading} width="4ch">{metadata?.name}</Skeleton.Root>
          {standard ? <Tag>{standard}</Tag> : null}
        </h1>
        <AddressRepresentation {...props} />

        {isLoading
          ? <div>Loading...</div>
          : metadata
            ? (
            <>
              {metadata.logo ? <Image src={metadata.logo} alt={metadata.name} width={100} height={100} /> : null}
              {metadata.thumbnail ? <Image src={metadata.thumbnail} alt={metadata.name} width={100} height={100} /> : null}
              <code>{stringify(metadata)}</code>
            </>
              )
            : null
        }
      </section>
    </LayoutSide>
  )
}
