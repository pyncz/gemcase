import Image from 'next/image'
import type { FC } from 'react'
import type { BlockchainInfo } from '../models'
import { Breadcrumps } from './ui'

export const BlockchainRepresentation: FC<BlockchainInfo> = ({ blockchainMetadata }) => {
  const { label, logo } = blockchainMetadata

  const logoSize = 24

  return (
    <Breadcrumps.Root className="tw-inline-flex tw-items-center tw-gap-ch">
      {logo
        ? <Image className="tw-inline-block" src={logo} alt={label} width={logoSize} height={logoSize} />
        : null
      }
      <span>{label}</span>
    </Breadcrumps.Root>
  )
}
