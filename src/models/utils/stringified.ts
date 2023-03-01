export type Stringified<T extends string | number | bigint | boolean> = `${T}`

export type MaybeStringified<T extends string | number | bigint | boolean> = T | Stringified<T>
