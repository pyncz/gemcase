import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import type { ChainConfig } from '../models'

interface Props extends Partial<ChainConfig> {}

export const ExploreForm: FC<Props> = ({ blockchain, chainId }) => {
  const { i18n } = useTranslation()

  return (
    <form>
      <div>
        <input placeholder="blockchain" required disabled={!!blockchain} value={blockchain} />
        <input placeholder="chain" required disabled={!!chainId} value={chainId} />
        <input placeholder="address" required />
        <input placeholder="tokenId" />
      </div>
      <button type="submit" className="tw-button tw-button-primary">
        {i18n.t('submit')}
      </button>
    </form>
  )
}
