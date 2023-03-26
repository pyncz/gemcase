import type { UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import type { Paginated, RendererProps, WithClassName } from '../../models'
import { Button } from '../ui'
import { Renderer } from './Renderer'

type Props<T = unknown> = {
  query: () => UseTRPCInfiniteQueryResult<Paginated<T>, any>
} & RendererProps<Paginated<T>[]>

export const InfiniteList = <
  T = unknown,
>(props: WithClassName<Props<T>>) => {
  const { query, className } = props
  const { i18n } = useTranslation()

  const { isLoading, data, hasNextPage, fetchNextPage } = query()

  return (
    <section className={classNames(
      'tw-flex tw-flex-col tw-gap-form',
      className,
    )}
    >
      <div className="tw-flex-1">
        <Renderer<Paginated<T>[]> {...props} data={data?.pages} isLoading={isLoading} />
      </div>

      {hasNextPage
        ? (
          <div className="tw-flex-center-x">
            <Button
              appearance="secondary"
              className="tw-w-full sm:tw-w-auto sm:tw-min-w-[10rem]"
              disabled={isLoading}
              onClick={() => fetchNextPage()}
            >
              {i18n.t('loadMore')}
            </Button>
          </div>
          )
        : null
      }
    </section>
  )
}
