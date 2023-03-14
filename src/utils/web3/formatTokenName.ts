import type { NumberLike } from '../../models'

export const formatTokenName = (
  tokenId: NumberLike,
  tokenName?: string,
  collectionName?: string,
) => {
  return tokenName ?? `${collectionName ? `${collectionName} ` : ''}#${+tokenId}`
}
