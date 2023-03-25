import type { MaybePromise, Nullable, NumberLike } from '@voire/type-utils'
import type { AddressMetadata, CoinContractMarketMetadata, Metadata, NftContractMetadata, NftTokenMetadata, Paginated } from '../../models'

export interface Methods<
  Address extends string = string,
  Chain extends string | number = string | number,
> {
  validateAddress(address: string): address is Address

  // Metadata
  getAddressMetadata(chain: Chain, address: Address): MaybePromise<AddressMetadata>

  getMetadata(chain: Chain, address: Address, tokenId?: NumberLike): MaybePromise<Nullable<Metadata & {
    blockchain: 'evm'
    address: Address
    chain: Chain
    tokenId?: NumberLike
  }>>

  getCoinContractMetadata(chain: Chain, address: Address): MaybePromise<Nullable<CoinContractMarketMetadata>>
  getNftContractMetadata(chain: Chain, address: Address): MaybePromise<Nullable<NftContractMetadata>>
  getNftTokenMetadata(chain: Chain, address: Address, tokenId: NumberLike): MaybePromise<Nullable<NftTokenMetadata>>

  // Fetchers
  getNftContractTokens(
    chain: Chain,
    address: Address,
    options?: {
      limit?: number
      cursor?: string
    },
  ): MaybePromise<Paginated<NftTokenMetadata>>

  getAccountNFTs(
    chain: Chain,
    address: Address,
    options?: {
      limit?: number
      cursor?: string
    },
  ): MaybePromise<Paginated<NftTokenMetadata>>
}
