import type { Entry, MaybePromise, Nullable } from '@voire/type-utils'
import type { AddressMetadata, CoinContractMetadata, NftContractMetadata, NftTokenMetadata, NumberLike } from '../../models'

export interface Methods<
  Address extends string = string,
  ChainId extends string | number = string | number,
> {
  validateAddress(address: string): address is Address
  check(chainId: ChainId, domain: string, address: Address): MaybePromise<AddressMetadata>

  getCoinContractMetadata(chainId: ChainId, address: Address): MaybePromise<Nullable<CoinContractMetadata>>
  getNftContractMetadata(chainId: ChainId, address: Address): MaybePromise<Nullable<NftContractMetadata>>
  getNftTokenMetadata(chainId: ChainId, address: Address, tokenId: NumberLike): MaybePromise<Nullable<NftTokenMetadata>>

  findChainById(chainId: string | number): Nullable<Entry<string | number, Record<string, any>>>
  validateChainById(chainId: string | number): chainId is ChainId
}
