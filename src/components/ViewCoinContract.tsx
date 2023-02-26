import type { FC } from 'react'
import type { AddressConfig } from '../models'
import { stringify, trpc } from '../utils'
import { AddressRepresentation } from './AddressRepresentation'

interface Props extends AddressConfig {}

export const ViewCoinContract: FC<Props> = (props) => {
  const {
    blockchain,
    chainId,
    address,
  } = props

  const {
    isLoading,
    data: metadata,
  } = trpc.metadata.getCoinContractMetadata.useQuery({ blockchain, chainId, address })

  return (
    <>
      <h1>A coin address</h1>
      <AddressRepresentation {...props} />

      {isLoading
        ? <div>Loading...</div>
        : <code>{stringify(metadata)}</code>
      }
    </>
  )
}
