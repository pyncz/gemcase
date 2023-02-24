import type { Numeric } from '@voire/type-utils'
import type { WithAliases } from '../../utils'

export type InferValue<T> = T extends Record<Numeric, infer Value>
  ? Value
  : never

// infer type = key OR aliases from the adapter's config
export type InferSlug<T, Slug extends Numeric = Numeric> = T extends Record<infer Key, WithAliases<infer Alias>>
  ? Key extends Slug ? Alias extends Slug ? Key | Alias : Key : never
  : never
