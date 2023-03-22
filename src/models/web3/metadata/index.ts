import type { Web3AddressEntity } from '..'
import type { AddressPath } from '../address'
import type { TokenPath } from '../token'
import type { AddressMetadata } from './address'
import type { CoinContractMarketMetadata } from './coin'
import type { NftContractMetadata } from './nftContract'
import type { NftTokenMetadata } from './nftToken'

export * from './address'
export * from './nftToken'
export * from './nftContract'
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
