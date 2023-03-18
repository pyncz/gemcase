import type { Entry, InferKey, InferValue, Nullable } from '@voire/type-utils'
import type { InferSlug } from '../../models'

export interface WithAliases<T extends string | number> {
  aliases?: Readonly<T[]>
}

type BaseConfig<
  T extends Record<string, Record<string, any>>,
> = T & {
  validateBlockchain(bc: string | number): bc is InferSlug<T>
  findBlockchain(bc: string | number): Nullable<Entry<InferKey<T>, InferValue<T>>>
  validateChain(bc: InferSlug<T>, nw: string | number): nw is InferSlug<InferValue<T>['chains']>
  findChain(bc: InferSlug<T>, nw: string | number): Nullable<Entry<InferKey<InferValue<T>['chains']>, InferValue<InferValue<T>['chains']>>>
}

interface BaseBlockchainConfig<
  ChainsConfig extends Record<string | number, WithAliases<string | number> & Record<string, any>>,
> {
  chains: ChainsConfig
  validateChain(nw: string | number): nw is InferSlug<ChainsConfig>
  findChain(nw: string | number): Nullable<Entry<InferKey<ChainsConfig>, InferValue<ChainsConfig>>>
}

export const findByKeyOrAlias = <
  Data extends Record<string | number, WithAliases<Slug> & any>,
  Slug extends string | number = string | number,
>(data: Data, keyOrAlias: Slug, strict = false): Nullable<Entry<InferKey<Data>, InferValue<Data>>> => {
  return Object.entries(data).find(([key, config]) => {
    const slug = keyOrAlias.toString()
    return key === slug || config.aliases?.some((alias: string | number) => {
      return strict ? keyOrAlias === alias : slug === alias.toString()
    })
  }) ?? null
}

export const createBlockchainAdapter = <
  Interfaces extends WithAliases<string> & Record<string, any>,
  ChainPath extends WithAliases<string | number> & Record<string, any>,
  ChainKey extends string | number = never,
>(
    interfaces: Interfaces,
    chains: Record<ChainKey, ChainPath>,
  ): BaseBlockchainConfig<typeof chains> & Interfaces => {
  const findChain = (chainSlug: string | number) => findByKeyOrAlias(chains, chainSlug)

  return {
    chains,
    ...interfaces,
    findChain,
    validateChain: (nw): nw is InferSlug<typeof chains> => {
      return !!findChain(nw)
    },
  }
}

export const createAdapter = <
  T extends Record<string, BaseBlockchainConfig<Record<string | number, any>>>,
>(
    config: T,
  ): BaseConfig<T> => {
  const findBlockchain = (bc: string | number) => findByKeyOrAlias(config, bc)

  return {
    ...config,
    findBlockchain,
    validateBlockchain: (bc): bc is InferSlug<T> => {
      return !!findBlockchain(bc)
    },
    validateChain: (bc, nw): nw is InferSlug<T[typeof bc]['chains']> => {
      const [_, bcConfig] = findBlockchain(bc) ?? []
      return bcConfig?.validateChain(nw) ?? false
    },
    findChain: (bc, nw) => {
      const [_, bcConfig] = findBlockchain(bc) ?? []
      return bcConfig?.findChain(nw) ?? null
    },
  }
}
