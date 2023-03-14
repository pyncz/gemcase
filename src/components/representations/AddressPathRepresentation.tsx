import type { FC } from 'react'
import type { AddressPath, ChainData } from '../../models'
import { Breadcrumps } from '../ui'
import { AddressRepresentation } from './AddressRepresentation'
import { ChainPathRepresentation } from './ChainPathRepresentation'

export const AddressPathRepresentation: FC<ChainData & AddressPath> = (props) => {
  return (
    <>
      <ChainPathRepresentation {...props} />

      <Breadcrumps.Root>
        <Breadcrumps.Divider />

        <AddressRepresentation {...props} />
      </Breadcrumps.Root>
    </>
  )
}
