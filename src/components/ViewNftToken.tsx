import type { FC } from 'react'
import type { TokenInfo } from '../models'
import { stringify, trpc } from '../utils'
import { AddressRepresentation } from './AddressRepresentation'

type Props = TokenInfo

export const ViewNftToken: FC<Props> = (props) => {
  const {
    isCollectibleNFT,
    blockchain,
    chainId,
    address,
    tokenId,
  } = props

  const {
    isLoading,
    data: metadata,
  } = trpc.metadata.getNftTokenMetadata.useQuery({ blockchain, chainId, address, tokenId })

  return (
    <>
      <h1>An NFT address</h1>
      <h2>Token ID #{tokenId}</h2>
      {isCollectibleNFT ? <small>collectible</small> : null}
      <AddressRepresentation {...props} />

      {isLoading
        ? <div>Loading...</div>
        : <code>{stringify(metadata)}</code>
      }
    </>
  )
}
