import { Icon } from '@iconify-icon/react'
import type { InferValue } from '@voire/type-utils'
import type { FC } from 'react'
import explorerIcon from '@iconify/icons-ion/information-circle-outline'
import { useTranslation } from 'next-i18next'
import { exploreAdapter } from '../services/exploreAdapter'
import type { ExplorerConfig } from '../models'
import { ButtonLink } from './ui'

interface Props {
  explorer: ExplorerConfig
  getHref: (resolver: InferValue<typeof exploreAdapter>) => string
  title?: string
}

export const ExplorerLink: FC<Props> = (props) => {
  const { i18n } = useTranslation()

  const {
    explorer,
    getHref,
    title = i18n.t('viewOn', { name: explorer.label }),
  } = props

  return (
    <ButtonLink
      title={title}
      targetBlank
      href={getHref(exploreAdapter[explorer.resolver])}
      appearance="secondary"
      icon={<Icon icon={explorerIcon} />}
    />
  )
}
