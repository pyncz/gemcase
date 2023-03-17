import type { Nullable } from '@voire/type-utils'

interface ChainPublicConfig {
  id: number | string
  label: string
  logo: Nullable<string>
  test: boolean
}

interface BlockchainPublicConfig {
  label: string
  logo: Nullable<string>
  chains: Record<string, ChainPublicConfig>
}

export interface Web3PublicConfig {
  blockchains: Record<string, BlockchainPublicConfig>
}
