import type { Nullable } from '@voire/type-utils'
import type { Flags } from '../../utils'

export type AddressMetadata = Flags<
  | 'isContract'
  | 'isCoin'
  | 'isNFT'
  | 'isCollectibleNFT'
> & {
  standard: Nullable<string>
}
