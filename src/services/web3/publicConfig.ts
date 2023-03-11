import { adapterConfig } from './adapter'
import type { BlockchainAdapterConfig, BlockchainKey, BlockchainPublicConfig, ChainAdapterConfig, ChainKey, ChainPublicConfig, Web3PublicConfig } from './types'

export const web3PublicConfig: Web3PublicConfig = {
  blockchains: Object.entries(adapterConfig).reduce((bcOptions, bcEntry) => {
    const [bc, bcConfig] = bcEntry as [BlockchainKey, BlockchainAdapterConfig]
    bcOptions[bc] = {
      label: bcConfig.label ?? null,
      logo: bcConfig.logo ?? null,
      chains: Object.entries(bcConfig.chains).reduce((nwOptions, nwEntry) => {
        const [nw, nwConfig] = nwEntry as [ChainKey, ChainAdapterConfig]
        nwOptions[nw] = {
          id: nwConfig.id,
          label: nwConfig.label ?? null,
          logo: nwConfig.logo ?? null,
          test: nwConfig.test ?? false,
        }

        return nwOptions
      }, {} as Record<ChainKey, ChainPublicConfig>),
    }

    return bcOptions
  }, {} as Record<BlockchainKey, BlockchainPublicConfig>),
}
