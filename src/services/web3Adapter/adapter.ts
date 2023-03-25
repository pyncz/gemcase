import { createAdapter } from './createAdapter'
import { evmAdapter } from './evm'

console.log('HERE I AM')

export const adapterConfig = {
  evm: evmAdapter,

  // TODO: Add blockchains?
  // - NEAR (maybe via Infura)
  // - Solana (maybe via Moralis)
  // - Aptos (maybe via Moralis)
}

export const web3Adapter = createAdapter(adapterConfig)
