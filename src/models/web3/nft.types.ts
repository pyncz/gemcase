import type { Nullable } from '@voire/type-utils'

// Contract
export interface NftContractMetadata {
  symbol: string
  name: string
}

// Token
interface Trait {
  trait_type: string
  value: string
  display_type?: 'string' | 'number'
  max_value?: number
  trait_count?: number
  order?: number
}

export interface NftTokenMetadata extends NftContractMetadata {
  amount: number
  tokenUri?: Nullable<string>
  metadata?: {
    name: string
    description?: string
    image: string
    animationUrl?: string
    externalUrl?: string
    attributes?: (string | Trait)[]
  }
}
