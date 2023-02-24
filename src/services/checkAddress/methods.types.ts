import type { MaybePromise, Nullable } from '@voire/type-utils'
import type { AddressMetadata, ChainID } from '../../models'

export interface Methods<
  Address extends string = string,
> {
  validateAddress(address: string): address is Address
  check(chainId: ChainID, domain: string, address: Address): MaybePromise<AddressMetadata>
  getContractMetadata(chainId: ChainID, domain: string, address: Address): MaybePromise<Nullable<Record<string, any>>>
  getTokenMetadata(chainId: ChainID, domain: string, address: Address, tokenId: string): MaybePromise<Nullable<Record<string, any>>>
}
