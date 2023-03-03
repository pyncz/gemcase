import type { MaybeArray } from '@voire/type-utils'

export const getParamsArray = (param?: MaybeArray<string>) => {
  return typeof param === 'string'
    ? [param]
    : param ?? []
}
