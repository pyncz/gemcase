import type { FC } from 'react'
import type { ChainData } from '../../models'
import { Breadcrumps } from '../ui'
import { BlockchainRepresentation } from './BlockchainRepresentation'
import { ChainRepresentation } from './ChainRepresentation'

export const ChainPathRepresentation: FC<ChainData> = (props) => {
  return (
    <Breadcrumps.Root>
      <BlockchainRepresentation {...props.blockchainMetadata} />
      <Breadcrumps.Divider />

      <ChainRepresentation {...props.chainMetadata} />
    </Breadcrumps.Root>
  )
}
