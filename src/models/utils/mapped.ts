import type { z } from 'zod'

export const mapped = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  map?: { [key in keyof z.baseObjectOutputType<T>]?: string },
) => {
  return schema.transform((data) => {
    type M = NonNullable<typeof map>
    const res = Object.keys(data).reduce((mappedSchema, oldKey: z.baseObjectOutputType<T>[any]) => {
      // @ts-expect-error Index typings' issues
      mappedSchema[map?.[oldKey] ?? oldKey] = data[oldKey]
      return mappedSchema
    }, {} as Omit<z.baseObjectOutputType<T>, keyof M> & { [key in keyof M]: z.baseObjectOutputType<T>[key] })

    return res
  })
}
