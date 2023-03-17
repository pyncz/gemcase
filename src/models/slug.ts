import type { InferField, InferItem, InferKey, InferValue, MaybeStringified } from '@voire/type-utils'

export type InferStrictSlug<
  T extends Record<keyof T, { 'aliases': readonly any[] }>,
  K extends number | string = number | string,
> = InferValue<T> extends { 'aliases': readonly any[] }
  ? MaybeStringified<Extract<InferKey<T>, K>> | InferItem<InferField<InferValue<T>, 'aliases'>>
  : never

export type InferSlug<
  T extends Record<K, any>,
  K extends number | string = number | string,
> = MaybeStringified<InferStrictSlug<T, K>>
