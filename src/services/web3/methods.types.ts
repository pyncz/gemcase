import type { MaybePromise, Nullable } from '@voire/type-utils'
import type { AddressMetadata, CoinContractMetadata, NftContractMetadata, NftTokenMetadata, NumberLike } from '../../models'

export interface Methods<
  Address extends string = string,
  Chain extends string | number = string | number,
> {
  validateAddress(address: string): address is Address
  getAddressMetadata(chain: Chain, address: Address): MaybePromise<AddressMetadata>

  getCoinContractMetadata(chain: Chain, address: Address): MaybePromise<Nullable<CoinContractMetadata>>
  getNftContractMetadata(chain: Chain, address: Address): MaybePromise<Nullable<NftContractMetadata>>
  getNftTokenMetadata(chain: Chain, address: Address, tokenId: NumberLike): MaybePromise<Nullable<NftTokenMetadata>>
}
