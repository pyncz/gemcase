import type { NumberLike } from '@voire/type-utils'

export const formatTokenName = (
  tokenId: NumberLike,
  tokenName?: string,
  collectionName?: string,
) => {
  return tokenName ?? `${collectionName ? `${collectionName} ` : ''}#${+tokenId}`
}
