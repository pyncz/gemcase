import type { InferValue } from '@voire/type-utils'
import type { Web3PublicConfig } from '../../models'
import { adapterConfig } from './adapter'
import type { ChainAdapterConfig, ChainKey } from './types'

export const web3PublicConfig: Web3PublicConfig = {
  blockchains: Object.entries(adapterConfig).reduce((bcOptions, bcEntry) => {
    const [bc, bcConfig] = bcEntry
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
      }, {} as InferValue<Web3PublicConfig['blockchains']>['chains']),
    }

    return bcOptions
  }, {} as Web3PublicConfig['blockchains']),
}
