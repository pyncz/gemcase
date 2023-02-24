export interface BlockchainConfig {
  blockchain: string
}

export interface ChainConfig extends BlockchainConfig {
  chainId?: string | number
}

export interface AddressConfig extends Required<ChainConfig> {
  address: string
}

export interface TokenConfig extends AddressConfig {
  tokenId?: string | number
}

export type RequestConfig = ChainConfig | AddressConfig | TokenConfig
