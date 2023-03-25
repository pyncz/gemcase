import type { HexString } from '@voire/type-utils'

export type HexAddress = HexString

// NOTE: Top Level Domains used to be just `.eth` or `.test`
// but since ENS collaborated with DNS, it may be any domain, e.g. `.xyz` etc
type TLD = string

export type EnsAddress = `${string}.${TLD}`
export type EvmAddress = HexAddress | EnsAddress
