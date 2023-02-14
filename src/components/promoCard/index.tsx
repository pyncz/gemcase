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
    <div className="tw-promo-card tw-group/card tw-bg-card tw-py-8 tw-flex tw-rounded-lg md:tw-flex-col tw-gap-6 tw-relative tw-overflow-hidden before:tw-absolute before:tw-pointer-events-none before:tw-rounded-lg before:tw-inset-0 before:tw-border before:tw-border-separator">
      <div className="tw-opacity-muted tw-w-[8%] tw-h-20 xs:tw-opacity-full xs:tw-w-20 sm:tw-w-auto sm:tw-h-auto tw-grid tw-items-center tw-justify-center tw-duration-normal group-hover/card:tw-scale-[1.05]">
        {imageComponent}
      </div>
      <div className="tw-relative tw-flex tw-flex-col tw-justify-center md:tw-items-center lg:tw-items-start lg:tw-text-start tw-px-5">
        <h4>{title}</h4>
        {description
          ? <p className="tw-text-sm tw-text-dim-1">{description}</p>
          : null}
      </div>
    </div>
  )
}
