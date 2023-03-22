import type { PriceData } from '../../price'
import type { ContractMetadata } from './token'

interface CoinMarketData {
  nativePrice?: PriceData<bigint> & {
    name: string
  }
  usdPrice: number
  exchangeName?: string
}

export interface CoinContractMetadata extends ContractMetadata {
  name: string
  symbol: string
  decimals: number
  logo?: string
  thumbnail?: string
}

export interface CoinContractMarketMetadata extends CoinContractMetadata {
  marketData?: CoinMarketData
}
