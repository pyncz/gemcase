import { clientEnv, clientSchema } from './schema.mjs'

const _clientEnv = clientSchema.safeParse(clientEnv)

export const formatErrors = (
  /**
   * @type {import('zod').ZodFormattedError<Map<string, string>, string>}
   */
  errors,
) =>
  Object.entries(errors)
    .reduce(
      (errors, [name, value]) => {
        if (value && '_errors' in value) {
          errors.push(`${name}: ${value._errors.join(', ')}\n`)
        }
        return errors
      },
    )

if (!_clientEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_clientEnv.error.format()),
  )
  throw new Error('Invalid environment variables')
}

for (const key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.warn(
      `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
    )

    throw new Error('Invalid public environment variable name')
  }
}

export const env = _clientEnv.data
