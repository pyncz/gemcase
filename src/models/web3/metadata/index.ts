import type { AddressMetadata } from './address'
import type { CoinContractMetadata } from './coin'
import type { NftContractMetadata, NftTokenMetadata } from './token'

export * from './token'
export * from './address'
export * from './coin'

export type ContractMetadata = NftContractMetadata | CoinContractMetadata

export type Metadata = AddressMetadata & ({} | ContractMetadata | NftTokenMetadata)
