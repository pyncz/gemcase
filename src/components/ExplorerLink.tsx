import { Icon } from '@iconify-icon/react'
import type { InferValue, PartialRecord } from '@voire/type-utils'
import type { FC, ReactNode } from 'react'
import explorerIcon from '@iconify/icons-ion/information-circle-outline'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import type { Explorer } from '../services/exploreAdapter'
import { exploreAdapter } from '../services/exploreAdapter'
import type { ExplorerConfig } from '../models'
import { ButtonLink } from './ui'
import { Adjusted } from './colorUtils'

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

  const iconMap: PartialRecord<Explorer, ReactNode> = {
    eth: (
      <Adjusted>
        <Image
          src="/img/explorers/etherscan.svg"
          alt="Etherscan logo"
          width={14}
          height={14}
        />
      </Adjusted>
    ),
  }

  return (
    <ButtonLink
      title={title}
      targetBlank
      href={getHref(exploreAdapter[explorer.resolver])}
      appearance="secondary"
      icon={iconMap[explorer.resolver] ?? <Icon icon={explorerIcon} />}
    />
  )
}
