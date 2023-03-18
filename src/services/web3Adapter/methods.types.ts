import type { MaybePromise, Nullable, NumberLike } from '@voire/type-utils'
import type { AddressMetadata, CoinContractMarketMetadata, Metadata, NftContractMetadata, NftTokenMetadata } from '../../models'

export interface Methods<
  Address extends string = string,
  Chain extends string | number = string | number,
> {
  validateAddress(address: string): address is Address
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
}
