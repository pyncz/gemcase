import type { FC, PropsWithChildren } from 'react'
import type { Nullable } from '@voire/type-utils'
import type { CoinContractMarketMetadata, SizeExtra, WithClassName } from '../../models'
import { Price } from '../Price'
import { Skeleton } from '../ui'
import { Representation, RepresentationImage } from './base'

interface Props {
  metadata?: Nullable<CoinContractMarketMetadata>
  imageSize?: SizeExtra | number
}

export const CoinContractRepresentation: FC<PropsWithChildren<WithClassName<Props>>> = (props) => {
  const {
    metadata,
    className,
    children,
    imageSize,
  } = props
  const {
    name,
    symbol,
    logo,
    marketData,
  } = metadata ?? {}

  return (
    <Representation
      className={className}
      image={
        <Skeleton.Element size={imageSize} className="!tw-rounded-full">
          {logo && name
            ? <RepresentationImage
                image={logo}
                alt={name}
                size={imageSize}
              />
            : null
          }
        </Skeleton.Element>
      }
      description={
        <Skeleton.Element width={90}>
          {marketData
            ? <Price value={marketData.usdPrice} symbol="USD" />
            : null
          }
        </Skeleton.Element>
      }
    >
      <Skeleton.Element width={60}>
        {children ?? symbol}
      </Skeleton.Element>
    </Representation>
  )
}
