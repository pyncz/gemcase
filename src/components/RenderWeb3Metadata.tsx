import type { Nullable } from '@voire/type-utils'
import type { FC, ReactNode } from 'react'
import { useAsync } from 'react-use'
import type { z } from 'zod'
import type { MetadataWithContext, optionalTokenSchema } from '../models'
import { debounce, trpcClient } from '../utils'
import { Skeleton } from './ui'

type Props = z.infer<typeof optionalTokenSchema> & {
  render: (metadata: Nullable<MetadataWithContext>) => ReactNode
  delay?: number
}

export const RenderWeb3Metadata: FC<Props> = (props) => {
  const { blockchain, chain, address, tokenId, delay, render } = props

  // When address is set try to figure out what contract / account this is
  const fetchMetadata = () => {
    if (blockchain && chain && address) {
      return trpcClient.metadata.getMetadata.query({
        blockchain,
        chain,
        address,
        tokenId: tokenId ?? undefined,
      })
    }
    return null
  }

  const debouncedFetchMetadata = delay ? debounce(fetchMetadata, delay) : fetchMetadata

  const { value: metadata, loading } = useAsync(
    async () => await debouncedFetchMetadata(),
    [blockchain, chain, address, tokenId],
  )

  return (
    <Skeleton.Root loaded={!!metadata || !loading}>
      <Skeleton.Element width={120} height={36}>
        {render(metadata ?? null)}
      </Skeleton.Element>
    </Skeleton.Root>
  )
}
