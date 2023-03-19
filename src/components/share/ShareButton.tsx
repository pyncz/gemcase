import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Icon } from '@iconify-icon/react'
import shareIcon from '@iconify/icons-ion/share-outline'
import classNames from 'classnames'
import type { SharingProps, WithClassName } from '../../models'
import { Button } from '../ui'
import { SharePopup } from './SharePopup'

export const ShareButton: FC<WithClassName<SharingProps>> = (props) => {
  const { className, ...attributes } = props

  const { i18n } = useTranslation()

  return (
    <SharePopup {...attributes}>
      <Button
        title={i18n.t('share')}
        className={classNames('tw-w-auto', className)}
        icon={<Icon icon={shareIcon} />}
      />
    </SharePopup>
  )
}
