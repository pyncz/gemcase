import type { FC } from 'react'
import type { ChainConfig } from '../models'
import { BlockchainRepresentation } from './BlockchainRepresentation'

export const ChainRepresentation: FC<ChainConfig> = ({ blockchain, chainId }) => {
  return (
    <>
      <BlockchainRepresentation blockchain={blockchain} />
      /
      <span>
        { chainId }
      </span>
    </>
  )
}
