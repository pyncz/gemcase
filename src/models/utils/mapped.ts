import type { z } from 'zod'

type MappedSchema<
  T extends Record<string, any>,
  OldKey extends keyof T,
  NewKey extends string,
> = Omit<T, OldKey | NewKey> & Record<NewKey, T[OldKey]>

export const mapped = <
  T extends Record<string, any>,
  OldKey extends keyof T,
  NewKey extends string,
>(
    schema: z.ZodType<T, z.ZodTypeDef, any>,
    oldKey: OldKey,
    newKey: NewKey,
  ): z.ZodType<MappedSchema<T, OldKey, NewKey>, z.ZodTypeDef, T> => {
  return schema.transform((data) => {
    const mappedData = {} as MappedSchema<T, OldKey, NewKey>

    for (const k in data) {
      const key = k as keyof T
      if (key === oldKey) {
        mappedData[newKey as keyof MappedSchema<T, OldKey, NewKey>] = data[key]
      } else {
        mappedData[key as keyof MappedSchema<T, OldKey, NewKey>] = data[key]
      }
    }
    return mappedData
  })
}
