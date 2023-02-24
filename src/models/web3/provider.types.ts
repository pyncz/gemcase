import { JsonRpcProvider as EthersJsonRpcProvider } from 'ethers'

export type IJsonRpcProvider = InstanceType<typeof JsonRpcProvider>

export class JsonRpcProvider extends EthersJsonRpcProvider {
  constructor(url: string, chainId?: number) {
    super(url, chainId)
  }
}
