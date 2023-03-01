import type { FC } from 'react'
import type { AddressInfo } from '../models'
import { stringify, trpc } from '../utils'
import { AddressRepresentation } from './AddressRepresentation'

interface Props extends AddressInfo {
  isCollectibleNFT: boolean
}

export const ViewNftContract: FC<Props> = (props) => {
  const {
    isCollectibleNFT,
    blockchain,
    chainId,
    address,
  } = props

  const {
    isLoading,
    data: metadata,
  } = trpc.metadata.getNftContractMetadata.useQuery({ blockchain, chainId, address })

  return (
    <>
      <h1>An NFT address</h1>
      {isCollectibleNFT ? <small>collectible</small> : null}
      <AddressRepresentation {...props} />

      {isLoading
        ? <div>Loading...</div>
        : <code>{stringify(metadata)}</code>
      }
    </>
  )
}
