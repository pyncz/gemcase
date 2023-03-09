import type { FC } from 'react'
import { useMemo } from 'react'
import type { AddressInfo } from '../models'
import { formatAddress } from '../utils'
import { CopyButton } from './CopyButton'

export const AddressRepresentation: FC<AddressInfo> = (props) => {
  const { address } = props

  const formattedAddress = useMemo(() => {
    return formatAddress(address)
  }, [address])

  return (
    <CopyButton className="tw-font-mono" value={address}>
      {formattedAddress}
    </CopyButton>
  )
}
