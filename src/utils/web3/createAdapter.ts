import type { Entry, Nullable, Numeric } from '@voire/type-utils'
import type { InferSlug, InferValue } from '../../models'

export interface WithAliases<T extends Numeric> {
  aliases?: Readonly<T[]>
}

type BaseConfig<
  T extends Record<string, Record<string, any>>,
> = T & {
  blockchains: string[]
  validateBlockchain(bc: string): bc is InferSlug<T, string>
  findBlockchain(bc: string): Nullable<Entry<keyof T, InferValue<T>>>
  validateChain(bc: InferSlug<T, string>, nw: Numeric): nw is InferSlug<InferChainsFromConfig<T>>
  findChain(bc: InferSlug<T, string>, nw: Numeric): Nullable<Entry<InferChainKey<T>, InferChainConfig<T>>>
}

interface BaseBlockchainConfig<
  ChainsConfig extends Record<Numeric, WithAliases<Numeric> & Record<string, any>>,
> {
  chains: ChainsConfig
  validateChain(nw: Numeric): nw is InferSlug<ChainsConfig>
  findChain(nw: Numeric): Nullable<Entry<keyof ChainsConfig, InferValue<ChainsConfig>>>
}

export const findByIdOrAlias = <
  Data extends Record<Numeric, WithAliases<Slug> & any>,
  Slug extends Numeric = Numeric,
>(data: Data, keyOrAlias: Slug): Nullable<Entry<keyof Data, InferValue<Data>>> => {
  return Object.entries(data).find(([key, config]) => {
    const slug = keyOrAlias.toString()
    return key === slug || config.aliases?.includes(keyOrAlias)
  }) ?? null
}

export const createBlockchainAdapter = <
  Interfaces extends Record<string, any>,
  ChainConfig extends WithAliases<Numeric> & Record<string, any>,
  ChainKey extends Numeric = never,
  BlockchainAlias extends string = never,
>(
    interfaces: Interfaces,
    chains: Record<ChainKey, ChainConfig>,
    options?: WithAliases<BlockchainAlias>,
  ): BaseBlockchainConfig<typeof chains> & Interfaces & WithAliases<BlockchainAlias> => {
  const findChain = (chainSlug: Numeric) => findByIdOrAlias(chains, chainSlug)

  return {
    chains,
    ...interfaces,
    ...options,
    findChain,
    validateChain: (nw): nw is InferSlug<typeof chains> => {
      return !!findChain(nw)
    },
  }
}

type InferChainsFromConfig<Config> = Config extends Record<string, infer BlockchainConfig>
  ? BlockchainConfig extends {
    chains: infer ChainsConfig
  } ? ChainsConfig : never
  : never

type InferChainConfig<Config> = InferValue<InferChainsFromConfig<Config>>
type InferChainKey<Config> = keyof InferChainsFromConfig<Config>

export const createAdapter = <
  T extends Record<string, BaseBlockchainConfig<Record<Numeric, any>>>,
>(
    config: T,
  ): BaseConfig<T> => {
  const findBlockchain = (bc: string) => findByIdOrAlias(config, bc)

  return {
    ...config,
    blockchains: Object.keys(config),
    findBlockchain,
    validateBlockchain: (bc): bc is InferSlug<T, string> => {
      return !!findBlockchain(bc)
    },
    validateChain: (bc, nw): nw is InferSlug<InferChainsFromConfig<T>> => {
      const [_, bcConfig] = findBlockchain(bc) ?? []
      return bcConfig?.validateChain(nw) ?? false
    },
    findChain: (bc, nw) => {
      const [_, bcConfig] = findBlockchain(bc) ?? []
      return bcConfig?.findChain(nw) ?? null
    },
  }
}
