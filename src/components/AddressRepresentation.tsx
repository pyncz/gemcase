import classNames from 'classnames'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { AddressData, WithClassName } from '../models'
import { formatAddress } from '../utils'
import { CopyButton } from './CopyButton'

export const AddressRepresentation: FC<WithClassName<AddressData>> = (props) => {
  const { address, className } = props

  const formattedAddress = useMemo(() => {
    return formatAddress(address)
  }, [address])

  return (
    <CopyButton
      className={classNames('tw-font-mono', className)}
      value={address}
    >
      {formattedAddress}
    </CopyButton>
  )
}
