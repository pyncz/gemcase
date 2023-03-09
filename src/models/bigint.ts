import type { HexString } from './hex'
import type { MaybeStringified, Stringified } from './utils'

export type StringifiedBigint = Stringified<bigint>
export type BigintLike = MaybeStringified<bigint> | HexString
