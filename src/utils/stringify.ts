/**
 * Stringify value considering bigint values
 * @param obj Object to serialize
 * @returns Stringified object string
 */
export const stringify = (obj: any): string => {
  return JSON.stringify(obj, (_, value) => {
    return typeof value === 'bigint'
      ? value.toString()
      : value
  })
}
