import type { UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared'
import classNames from 'classnames'
import type { PropsWithChildren, ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import type { Paginated, WithClassName } from '../../models'
import { Button } from '../ui'

interface Props<T = unknown> {
  render: (data?: Paginated<T>[]) => ReactNode
  query: () => UseTRPCInfiniteQueryResult<Paginated<T>, any>
}

export const InfiniteList = <
  T = unknown,
>(props: PropsWithChildren<WithClassName<Props<T>>>) => {
  const {
    render,
    query,
    className,
  } = props

  const { i18n } = useTranslation()

  const { isFetching, data, hasNextPage, fetchNextPage } = query()

  return (
    <section className={classNames(
      'tw-flex tw-flex-col tw-min-h-viewport',
      className,
    )}
    >
      <div className="tw-flex-1">
        {render(data?.pages)}
      </div>

      {hasNextPage
        ? (
          <div className="tw-px-container tw-py-container tw-flex-center-x">
            <Button
              appearance="secondary"
              className="tw-w-full sm:tw-w-auto sm:tw-min-w-[10rem]"
              disabled={isFetching}
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
