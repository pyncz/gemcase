import type { FC } from 'react'
import type { MetadataWithContext, WithClassName } from '../../models'
import { AccountRepresentation } from './AccountRepresentation'
import { CoinContractRepresentation } from './CoinContractRepresentation'
import { NftContractRepresentation } from './NftContractRepresentation'
import { NftRepresentation } from './NftRepresentation'

type Props = MetadataWithContext

export const Web3EntityRepresentation: FC<WithClassName<Props>> = (props) => {
  const { is } = props

  if (is === 'nft') {
    return (
      // NFT
      <NftRepresentation {...props} metadata={props} />
    )
  } else if (is === 'nftContract') {
    return (
      // NFT Contract address
      <NftContractRepresentation metadata={props} />
    )
  } else if (is === 'coinContract') {
    return (
      // Coin Contract address
      <CoinContractRepresentation metadata={props} />
    )
  } else {
    return (
      // Just a regular address
      <AccountRepresentation {...props} />
    )
  }
}
