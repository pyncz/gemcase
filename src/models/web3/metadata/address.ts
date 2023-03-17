import type { Flags, Nullable } from '@voire/type-utils'

export type AddressMetadata = Flags<
  | 'isContract'
  | 'isCoin'
  | 'isNFT'
  | 'isCollectibleNFT'
> & {
  standard: Nullable<string>
}
