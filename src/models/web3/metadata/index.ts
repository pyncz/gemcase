import type { Web3AddressEntity } from '..'
import type { AddressMetadata } from './address'
import type { CoinContractMarketMetadata } from './coin'
import type { NftContractMetadata, NftTokenMetadata } from './token'

export * from './token'
export * from './address'
export * from './coin'

export type ContractMetadata = NftContractMetadata | CoinContractMarketMetadata

export type Metadata = AddressMetadata & (
  | (ContractMetadata & { is: Web3AddressEntity })
  | (NftTokenMetadata & { is: 'nft' })
)
