import type { SharePlatform } from '../../models'

type SharerOptions<TKey extends string> = Record<TKey, (params: {
  url: string
  message?: string
  hashtags?: string[]
}) => string>

export const createSharer = <
  T extends SharerOptions<SharePlatform>,
>(config: T) => config
