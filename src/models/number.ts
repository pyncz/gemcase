import type { HexString } from './hex'

export type StringNumber = `${number}`

export type NumberLike = number | StringNumber | HexString
