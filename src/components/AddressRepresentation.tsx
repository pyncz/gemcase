import type { FC } from 'react'
import { useMemo } from 'react'
import type { AddressConfig } from '../models'
import { formatAddress } from '../utils'
import { ChainRepresentation } from './ChainRepresentation'

export const AddressRepresentation: FC<AddressConfig> = ({ blockchain, chainId, address }) => {
  const formattedAddress = useMemo(() => {
    return formatAddress(address)
  }, [address])

  return (
    <>
      <ChainRepresentation blockchain={blockchain} chainId={chainId} />
      /
      <span>
        {formattedAddress}
      </span>
    </>
  )
}
