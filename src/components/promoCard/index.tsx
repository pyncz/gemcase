import type { FC } from 'react'
import { PromoCardAddressesImage, PromoCardAssetsImage, PromoCardNetworksImage } from './images'

const promoCardImagesMap = {
  addresses: PromoCardAddressesImage,
  assets: PromoCardAssetsImage,
  networks: PromoCardNetworksImage,
}

type PromoCardImage = keyof typeof promoCardImagesMap

interface Props {
  title: string
  description?: string
  image?: PromoCardImage
}

export const PromoCard: FC<Props> = (props) => {
  const {
    title,
    description,
    image,
  } = props

  const imageComponent = promoCardImagesMap[image ?? 'assets']

  return (
    <div className="promo-card">
      <div className="promo-card-image">
        {imageComponent}
      </div>
      <div className="promo-card-content">
        <h4>{title}</h4>
        {description
          ? <p className="tw-text-sm tw-text-dim-1">{description}</p>
          : null}
      </div>
    </div>
  )
}
