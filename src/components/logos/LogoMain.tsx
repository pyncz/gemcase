import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import type { Size } from '../../models'

interface Props {
  size?: Size
}

export const LogoMain: FC<Props> = (props) => {
  const { i18n } = useTranslation()
  const size: Size = props.size ?? 'md'

  return (
    <span title={i18n.t('logo', { name: 'gemcase' })}>
      <svg className={`tw-h-logo-${size}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.71838 33.6698L15.5052 26.8829L48.4949 26.8829L55.2818 33.6698L32.0001 56.9515L8.71838 33.6698Z" fill="#1144FB" />
        <path d="M32.0002 5.44905L40.7308 14.1797L32.0002 22.9103L23.2695 14.1797L32.0002 5.44905Z" fill="#37eed5" />
      </svg>
    </span>
  )
}
