import type { FC } from 'react'
import type { AddressInfo } from '../models'
import { AddressRepresentation } from './AddressRepresentation'
import { ChainPathRepresentation } from './ChainPathRepresentation'
import { Breadcrumps } from './ui'

export const AddressPathRepresentation: FC<AddressInfo> = (props) => {
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
