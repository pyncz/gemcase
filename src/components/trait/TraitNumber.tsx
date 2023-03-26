import type { Nullable } from '@voire/type-utils'
import type { FC } from 'react'

interface Props {
  value: number
  max?: Nullable<number>
}

export const TraitNumber: FC<Props> = ({ value, max }) => {
  return (
    <>
      {value}
      {max ? <span className="tw-text-3/4 tw-opacity-muted">/{max}</span> : null}
    </>
  )
}
