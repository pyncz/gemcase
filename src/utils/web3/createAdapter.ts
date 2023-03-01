import type { Entry, Nullable } from '@voire/type-utils'
import type { InferSlug, InferValue } from '../../models'

export interface WithAliases<T extends string | number> {
  aliases?: Readonly<T[]>
}

type BaseConfig<
  T extends Record<string, Record<string, any>>,
> = T & {
  blockchains: string[]
  validateBlockchain(bc: string): bc is InferSlug<T, string>
  findBlockchain(bc: string): Nullable<Entry<keyof T, InferValue<T>>>
  validateChain(bc: InferSlug<T, string>, nw: string | number): nw is InferSlug<InferChainsFromConfig<T>>
  findChain(bc: InferSlug<T, string>, nw: string | number): Nullable<Entry<InferChainKey<T>, InferChainConfig<T>>>
}

interface BaseBlockchainConfig<
  ChainsConfig extends Record<string | number, WithAliases<string | number> & Record<string, any>>,
> {
  chains: ChainsConfig
  validateChain(nw: string | number): nw is InferSlug<ChainsConfig>
  findChain(nw: string | number): Nullable<Entry<keyof ChainsConfig, InferValue<ChainsConfig>>>
}

export const findByIdOrAlias = <
  Data extends Record<string | number, WithAliases<Slug> & any>,
  Slug extends string | number = string | number,
>(data: Data, keyOrAlias: Slug, strict = false): Nullable<Entry<keyof Data, InferValue<Data>>> => {
  return Object.entries(data).find(([key, config]) => {
    const slug = keyOrAlias.toString()
    return key === slug || config.aliases?.some((alias: string | number) => {
      return strict ? keyOrAlias === alias : slug === alias.toString()
    })
  }) ?? null
}

export const createBlockchainAdapter = <
  Interfaces extends WithAliases<string> & Record<string, any>,
  ChainConfig extends WithAliases<string | number> & Record<string, any>,
  ChainKey extends string | number = never,
>(
    interfaces: Interfaces,
    chains: Record<ChainKey, ChainConfig>,
  ): BaseBlockchainConfig<typeof chains> & Interfaces => {
  const findChain = (chainSlug: string | number) => findByIdOrAlias(chains, chainSlug)

  return {
    chains,
    ...interfaces,
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
  T extends Record<string, BaseBlockchainConfig<Record<string | number, any>>>,
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
