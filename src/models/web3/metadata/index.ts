import type { Web3AddressEntity } from '..'
import type { AddressPath } from '../address'
import type { TokenPath } from '../token'
import type { AddressMetadata } from './address'
import type { CoinContractMarketMetadata } from './coin'
import type { NftContractMetadata, NftTokenMetadata } from './token'

export * from './token'
export * from './address'
export * from './coin'

export type Metadata = AddressMetadata & (
  | { is: 'account' }
  | (CoinContractMarketMetadata & { is: 'coinContract' })
  | (NftContractMetadata & { is: 'nftContract' })
  | (NftTokenMetadata & { is: 'nft' })
)

export type MetadataWithContext = Metadata & (
  | (AddressPath & { is: Web3AddressEntity })
  | (TokenPath & { is: 'nft' })
)
