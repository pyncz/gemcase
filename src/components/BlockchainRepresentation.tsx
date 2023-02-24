import type { FC } from 'react'
import type { BlockchainConfig } from '../models'

export const BlockchainRepresentation: FC<BlockchainConfig> = ({ blockchain }) => {
  return (
    <span>
      { blockchain }
    </span>
  )
}
