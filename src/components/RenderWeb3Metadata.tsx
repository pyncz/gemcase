import type { Nullable } from '@voire/type-utils'
import type { FC, ReactElement, ReactNode } from 'react'
import { useAsync } from 'react-use'
import type { z } from 'zod'
import type { MetadataWithContext, optionalTokenSchema } from '../models'
import { debounce, trpc } from '../utils'
import { Skeleton } from './ui'

type Props = z.infer<typeof optionalTokenSchema> & {
  render: (metadata: Nullable<MetadataWithContext>) => ReactNode
  delay?: number
  placeholder?: ReactElement
}

export const RenderWeb3Metadata: FC<Props> = (props) => {
  const { blockchain, chain, address, tokenId, delay, placeholder, render } = props

  // When address is set try to figure out what contract / account this is
  const fetchMetadata = () => {
    if (blockchain && chain && address) {
      return trpc.useContext().getMetadata.fetch({
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
    <Skeleton.Root loaded={!loading}>
      <Skeleton.Element width={120} height={36} placeholder={placeholder}>
        {render(metadata ?? null)}
      </Skeleton.Element>
    </Skeleton.Root>
  )
}
