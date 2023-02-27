import type { HexString } from './hex'

export type StringifiedNumber = `${number}`

export type NumberLike = number | StringifiedNumber | HexString
