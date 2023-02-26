import type { Entry, MaybePromise, Nullable } from '@voire/type-utils'
import type { AddressMetadata, NumberLike } from '../../models'

export interface Methods<
  Address extends string = string,
  ChainId extends string | number = string | number,
> {
  validateAddress(address: string): address is Address
  check(chainId: ChainId, domain: string, address: Address): MaybePromise<AddressMetadata>

  getContractMetadata(chainId: ChainId, domain: string, address: Address): MaybePromise<Nullable<Record<string, any>>>
  getTokenMetadata(chainId: ChainId, domain: string, address: Address, tokenId: NumberLike): MaybePromise<Nullable<Record<string, any>>>

  findChainById(chainId: string | number): Nullable<Entry<string | number, Record<string, any>>>
  validateChainById(chainId: string | number): boolean
}
