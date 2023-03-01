import Image from 'next/image'
import type { FC } from 'react'
import type { ChainInfo } from '../models'
import { BlockchainRepresentation } from './BlockchainRepresentation'
import { Breadcrumps } from './ui'

export const ChainRepresentation: FC<ChainInfo> = (props) => {
  const { chainMetadata } = props
  const { label, logo } = chainMetadata

  const logoSize = 20

  return (
    <>
      <BlockchainRepresentation {...props} />
      <Breadcrumps.Root>
        <Breadcrumps.Divider />
        {logo
          ? <Image className="tw-inline-block" src={logo} alt={label} width={logoSize} height={logoSize} />
          : null
        }
        {chainMetadata.label}
      </Breadcrumps.Root>
    </>
  )
}
