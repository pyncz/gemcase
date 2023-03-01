import type { FC } from 'react'
import { useMemo } from 'react'
import type { AddressInfo } from '../models'
import { formatAddress } from '../utils'
import { ChainRepresentation } from './ChainRepresentation'
import { CopyButton } from './CopyButton'
import { Breadcrumps } from './ui'

export const AddressRepresentation: FC<AddressInfo> = (props) => {
  const { address } = props

  const formattedAddress = useMemo(() => {
    return formatAddress(address)
  }, [address])

  return (
    <>
      <ChainRepresentation {...props} />
      <Breadcrumps.Root>
        <Breadcrumps.Divider />
        <CopyButton value={address}>
          {formattedAddress}
        </CopyButton>
      </Breadcrumps.Root>
    </>
  )
}
