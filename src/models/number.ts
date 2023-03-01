import type { HexString } from './hex'
import type { MaybeStringified, Stringified } from './utils'

export type StringifiedNumber = Stringified<number>
export type NumberLike = MaybeStringified<number> | HexString

export type StringifiedBigint = Stringified<bigint>
export type BigintLike = MaybeStringified<bigint> | HexString
