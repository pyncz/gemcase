import type { InferKey } from '@voire/type-utils'
import { createAdapter, withBaseUrl } from '@wiiib/explorer-adapter'
import { epirusResolver, etherscanResolver, etherscanResolverNext } from '@wiiib/explorer-adapter/dist/resolvers'

export const exploreAdapter = createAdapter({
  eth: withBaseUrl(etherscanResolverNext, 'https://etherscan.io/'),
  goerli: withBaseUrl(etherscanResolverNext, 'https://goerli.etherscan.io/'),
  sepolia: withBaseUrl(etherscanResolverNext, 'https://sepolia.etherscan.io/'),
  polygon: withBaseUrl(etherscanResolver, 'https://polygonscan.com/'),
  mumbai: withBaseUrl(etherscanResolver, 'https://mumbai.polygonscan.com/'),
  avalanche: withBaseUrl(etherscanResolver, 'https://snowtrace.io/'),
  avalancheTestnet: withBaseUrl(etherscanResolver, 'https://testnet.snowtrace.io/'),
  palm: withBaseUrl(epirusResolver, 'https://palm.epirus.io/'),
  arbitrum: withBaseUrl(etherscanResolver, 'https://arbiscan.io/'),
})

export type Explorer = InferKey<typeof exploreAdapter>
