import type { AddressInfo } from './address.types'
import type { BlockchainInfo } from './blockchain.types'
import type { ChainInfo } from './chain.types'
import type { TokenInfo } from './nft.types'

export * from './provider.types'

export * from './blockchain.types'
export * from './chain.types'
export * from './address.types'

export * from './coin.types'
export * from './nft.types'

export type Web3Params =
  | BlockchainInfo | ChainInfo | AddressInfo | TokenInfo
