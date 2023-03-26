import type { UseTRPCQueryResult } from '@trpc/react-query/shared'
import type { RendererProps } from '../../models'
import { Renderer } from './Renderer'

type Props<T = unknown> = {
  query: () => UseTRPCQueryResult<T, any>
} & RendererProps<T>

export const Fetcher = <
  T = unknown,
>(props: Props<T>) => {
  const { query } = props
  const { isLoading, data } = query()

  return <Renderer<T> {...props} data={data} isLoading={isLoading} />
}
