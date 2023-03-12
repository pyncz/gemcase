import { router } from '../trpc'
import { metadataRouter } from './metadata'
import { validateRouter } from './validate'

export const appRouter = router({
  metadata: metadataRouter,
  validate: validateRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
