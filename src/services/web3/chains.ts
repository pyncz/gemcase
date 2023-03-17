import type { EvmChainID } from '../../models'

export const evmChains = {
  eth: {
    id: 1 as EvmChainID,
    label: 'Ethereum Mainnet',
    rpcDomain: 'mainnet',
    aliases: ['0x1', 'ethereum', 'mainnet', 'ethereum-mainnet', 1] as const,
    logo: '/img/chains/ethereum-eth-logo.png',
    explorer: {
      label: 'Etherscan',
      url: 'https://etherscan.io/',
    },
    test: false,
  },
  goerli: {
    id: 5 as EvmChainID,
    label: 'Goerli Testnet',
    rpcDomain: 'goerli',
    aliases: ['0x5', 'testnet', 'goerli-testnet', 5] as const,
    logo: '/img/chains/ethereum-eth-logo.png',
    explorer: {
      label: 'Etherscan Goerli Testnet Explorer',
      url: 'https://goerli.etherscan.io/',
    },
    test: true,
  },
  sepolia: {
    id: 11155111 as EvmChainID,
    label: 'Sepolia Testnet',
    rpcDomain: 'sepolia',
    aliases: ['0xaa36a7', 'sepolia-testnet', 11155111] as const,
    logo: '/img/chains/ethereum-eth-logo.png',
    explorer: {
      label: 'Etherscan Sepolia Testnet Explorer',
      url: 'https://sepolia.etherscan.io/',
    },
    test: true,
  },
  polygon: {
    id: 137 as EvmChainID,
    label: 'Polygon',
    rpcDomain: 'polygon-mainnet',
    aliases: ['0x89', 'matic', 'polygon-mainnet', 'matic-mainnet', 137] as const,
    logo: '/img/chains/polygon-matic-logo.png',
    explorer: {
      label: 'Polygonscan',
      url: 'https://polygonscan.com/',
    },
    test: false,
  },
  mumbai: {
    id: 80001 as EvmChainID,
    label: 'Matic Mumbai Testnet',
    rpcDomain: 'polygon-mumbai',
    aliases: ['0x13881', 'polygon-mumbai', 80001] as const,
    logo: '/img/chains/polygon-matic-logo.png',
    explorer: {
      label: 'Polygonscan Mumbai',
      url: 'https://mumbai.polygonscan.com/',
    },
    test: true,
  },
  avalanche: {
    id: 43114 as EvmChainID,
    label: 'Avalanche C-Chain',
    rpcDomain: 'avalanche-mainnet',
    aliases: ['0xa86a', 'avalanche-mainnet', 43114] as const,
    logo: '/img/chains/avalanche-avax-logo.png',
    explorer: {
      label: 'SnowTrace Avalanche C-Chain Explorer',
      url: 'https://snowtrace.io/',
    },
    test: false,
  },
  avalancheTestnet: {
    id: 43113 as EvmChainID,
    label: 'Avalanche Fuji Testnet',
    rpcDomain: 'avalanche-fuji',
    aliases: ['0xa869', 'avalanche-fuji', 'fuji', 43113] as const,
    logo: '/img/chains/avalanche-avax-logo.png',
    explorer: {
      label: 'SnowTrace Avalanche C-Chain Testnet Explorer',
      url: 'https://testnet.snowtrace.io/',
    },
    test: true,
  },
  palm: {
    id: 11297108109 as EvmChainID,
    label: 'Palm',
    rpcDomain: 'palm-mainnet',
    aliases: ['0x2a15c308d', 'palm-mainnet', 11297108109] as const,
    logo: '/img/chains/palm-logo.png',
    explorer: {
      label: 'Epirus Palm Explorer',
      url: 'https://palm.epirus.io/',
    },
    test: false,
  },
  arbitrum: {
    id: 42161 as EvmChainID,
    label: 'Arbitrum One',
    rpcDomain: 'arbitrum-mainnet',
    aliases: ['0xa4b1', 'arbitrum-mainnet', 42161] as const,
    logo: '/img/chains/arbitrum-logo.png',
    explorer: {
      label: 'Arbiscan Arbitrum One Explorer',
      url: 'https://arbiscan.io/',
    },
    test: false,
  },

  // TODO: Add networks?
  //
  // Infura doesn't support them. Wish could use Moralis as the RPC provider.
  //   56: BSC
  //   97: BSC Testnet
  //   250: Fantom
  //   25: Cronos
  //   338: Cronos Testnet
  //
  // Moralis doesn't support them.
  //   42220: Celo
  //   44787: Celo Alfajores Testnet
  //   11297108099: Palm Testnet
  //   10: Optimism
  //   420: Optimism Goerli Testnet
  //   421613: Arbitrum Goerli Testnet
  //   1313161554: Aurora
  //   1313161555: Aurora Testnet
}
