import type { TokenTrait } from '../../models'

export const compareTraits = (a: string | TokenTrait, b: string | TokenTrait): number => {
  return typeof a === 'string'
    ? typeof b === 'string'
      ? 0 // both strings
      : 1 // first b (object), then a (string)
    : typeof b === 'string'
      ? -1 // first a (object), then b (string)
      : ((a.order ?? 0) - (b.order ?? 0)) // both objects, compare `order` field
}
