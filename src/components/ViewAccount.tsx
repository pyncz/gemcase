import type { FC } from 'react'
import type { AddressConfig } from '../models'
import { AddressRepresentation } from './AddressRepresentation'

type Props = AddressConfig

export const ViewAccount: FC<Props> = (props) => {
  return (
    <div>
      <h1>Just a regular address</h1>
      <AddressRepresentation {...props} />
      {/* TODO: Show related NFT owned by the address? */}
    </div>
  )
}
