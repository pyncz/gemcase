import type { FC } from 'react'
import type { AddressPath, WithClassName } from '../../models'
import { AddressRepresentation } from './AddressRepresentation'

export const AccountRepresentation: FC<WithClassName<AddressPath>> = (props) => {
  return (
    <>
      <AddressRepresentation {...props} />
      {/* Maybe add some short balance summary or something */}
    </>
  )
}
