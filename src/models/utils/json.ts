import { z } from 'zod'

export const fromJSON = <T extends z.Schema>(schema: T) => {
  return z.preprocess(
    data => typeof data === 'string' ? JSON.parse(data) : data,
    schema,
  )
}
