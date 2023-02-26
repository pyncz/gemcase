import { router } from '../trpc'
import { metadataRouter } from './metadata'

export const appRouter = router({
  metadata: metadataRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
