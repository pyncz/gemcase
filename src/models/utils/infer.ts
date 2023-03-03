import type { WithAliases } from '../../utils'
import type { MaybeStringified } from './stringified'

export type InferValue<T> = T extends Record<string | number, infer Value>
  ? Value
  : never

// infer type = key OR aliases from the adapter's config
export type InferStrictSlug<
  T,
  Slug extends string | number = string | number,
> = T extends Record<infer Key, WithAliases<infer Alias>>
  ? Key extends Slug
    ? Alias extends Slug
      ? MaybeStringified<Key> | Alias
      : MaybeStringified<Key>
    : never
  : never

export type InferSlug<
  T,
  Slug extends string | number = string | number,
> = MaybeStringified<InferStrictSlug<T, Slug>>

export type InferKey<T> = keyof T
