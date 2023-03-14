import type { PriceData } from '../../price'

interface CoinMarketData {
  nativePrice?: PriceData<bigint> & {
    name: string
  }
  usdPrice: number
  exchangeName?: string
}

export interface CoinContractMetadata {
  name: string
  symbol: string
  decimals: number
  logo?: string
  thumbnail?: string
}

export interface CoinContractMarketMetadata extends CoinContractMetadata {
  marketData?: CoinMarketData
}
