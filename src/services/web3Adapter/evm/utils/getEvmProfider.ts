import { JsonRpcProvider } from '../../../../models'

export const getEvmProvider = (chainId: number | string, domain: string) => {
  // TODO: Check if env vars are imported by dotenv under the hood
  return new JsonRpcProvider(
    `https://${domain}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    +chainId,
  )
}
