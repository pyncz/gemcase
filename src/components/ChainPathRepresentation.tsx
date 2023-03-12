import type { FC } from 'react'
import type { ChainData } from '../models'
import { BlockchainRepresentation } from './BlockchainRepresentation'
import { ChainRepresentation } from './ChainRepresentation'
import { Breadcrumps } from './ui'

export const ChainPathRepresentation: FC<ChainData> = (props) => {
  return (
    <>
      <BlockchainRepresentation {...props.blockchainMetadata} />

      <Breadcrumps.Root>
        <Breadcrumps.Divider />

        <ChainRepresentation {...props.chainMetadata} />
      </Breadcrumps.Root>
    </>
  )
}
