import type { FC } from 'react'
import type { BlockchainMetadata } from '../models'
import { Representation } from './base'

export const BlockchainRepresentation: FC<BlockchainMetadata> = (props) => {
  const { label, logo } = props

  return (
    <Representation className="tw-font-mono" image={logo} label={label} />
  )
}
