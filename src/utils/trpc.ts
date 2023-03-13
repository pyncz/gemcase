import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'
import { defu } from 'defu'

import type { AppRouter } from '../server/trpc/router/_app'
import { getBaseUrl } from './app'

const trpcLinks = [
  loggerLink({
    enabled: opts =>
      process.env.NODE_ENV === 'development'
      || (opts.direction === 'down' && opts.result instanceof Error),
  }),
  httpBatchLink({
    url: `${getBaseUrl()}/api/trpc`,
  }),
]

const trpcClient = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: trpcLinks,
})

const trpcHooks = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: trpcLinks,
    }
  },
  ssr: false,
})

export const trpc = defu(trpcClient, trpcHooks)

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
