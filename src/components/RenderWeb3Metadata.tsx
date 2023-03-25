import type { Nullable } from '@voire/type-utils'
import type { FC, ReactElement, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import type { z } from 'zod'
import type { MetadataWithContext, optionalTokenSchema } from '../models'
import { trpc } from '../utils'
import { Skeleton } from './ui'

type Props = z.infer<typeof optionalTokenSchema> & {
  render: (metadata: Nullable<MetadataWithContext>) => ReactNode
  delay?: number
  placeholder?: ReactElement
}

export const RenderWeb3Metadata: FC<Props> = (props) => {
  const { blockchain, chain, address, tokenId, delay, placeholder, render } = props

  const trpcUtils = trpc.useContext()

  const [isFetching, setIsFetching] = useState(false)
  const controller = useRef<Nullable<AbortController>>(null)

  const [metadata, setMetadata] = useState<Nullable<MetadataWithContext>>(null)

  const [isDebounceReady] = useDebounce(
    async () => {
      if (blockchain && chain && address) {
        // fetch metadata
        setIsFetching(true)
        controller.current = new AbortController()

        const metadata = await trpcUtils.getMetadata.fetch({
          blockchain,
          chain,
          address,
          tokenId: tokenId ?? undefined,
        }, { signal: controller.current.signal })

        controller.current = null
        setMetadata(metadata)
        setIsFetching(false)
      } else {
        setMetadata(null)
      }
    },
    delay,
    [trpcUtils, blockchain, chain, address, tokenId],
  )

  const loading = useMemo(() => isFetching || !isDebounceReady, [isFetching, isDebounceReady])

  /**
   * Debonce timeout is {@link https://github.com/streamich/react-use/blob/325f5bd69904346788ea981ec18bfc7397c611df/src/useTimeoutFn.ts#L36 cleared}
   * on unmount automatically but we still need to abort the request if it has been already initiated,
   * so abort on unnount
   */
  useEffect(() => {
    return () => controller.current?.abort()
  }, [])

  return (
    <Skeleton.Root loaded={!loading}>
      <Skeleton.Element width={120} height={36} placeholder={placeholder}>
        {render(metadata)}
      </Skeleton.Element>
    </Skeleton.Root>
  )
}
