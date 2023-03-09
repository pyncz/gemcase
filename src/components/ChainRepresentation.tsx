import type { FC } from 'react'
import type { ChainMetadata } from '../models'
import { Representation } from './base'

export const ChainRepresentation: FC<ChainMetadata> = (props) => {
  const { label, logo } = props

  return (
    <Representation className="tw-font-mono" label={label} image={logo} />
  )
}
