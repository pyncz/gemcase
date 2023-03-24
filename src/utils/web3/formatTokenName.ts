import type { Nullable, NumberLike } from '@voire/type-utils'

export const formatTokenName = (
  tokenId: NumberLike,
  tokenName?: Nullable<string>,
  collectionName?: string,
) => {
  return tokenName ?? `${collectionName ? `${collectionName} ` : ''}#${+tokenId}`
}
