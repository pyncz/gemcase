import { useForm, useWatch } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { Icon } from '@iconify-icon/react'
import searchIcon from '@iconify-icons/ion/search-outline'
import type { ChainConfig, ExploreFormInput } from '../models'
import { exploreSchema } from '../models'
import { Button, ControlledField, ErrorMessage, Input, Select } from './ui'

interface Props extends Partial<ChainConfig> {}

export const ExploreForm: FC<Props> = (props) => {
  const {
    blockchain: initBlockchain,
    chainId: initChainId,
  } = props
  const { i18n } = useTranslation()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExploreFormInput>({
    resolver: zodResolver(exploreSchema),
    defaultValues: {
      blockchain: initBlockchain,
      chainId: initChainId,
    },
  })

  const formElementClassName = 'tw-w-full xs:tw-w-40'

  const blockchain = useWatch({ control, name: 'blockchain' })
  const chainId = useWatch({ control, name: 'chainId' })

  const addressPlaceholder = chainId
    ? i18n.t('exploreForm.address.placeholder_chain', { chain: chainId })
    : i18n.t('exploreForm.address.placeholder')

  const onSubmit: SubmitHandler<ExploreFormInput> = (data) => {
    console.log(data, chainId, blockchain)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-form">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-flex-wrap tw-gap-fields">
        <ControlledField<ExploreFormInput, 'blockchain'>
          name="blockchain"
          control={control}
          label={i18n.t('exploreForm.blockchain.label')}
          render={({ id, field }) => (
            <Select
              id={id}
              {...field}
              className={formElementClassName}
              placeholder={i18n.t('exploreForm.blockchain.placeholder')}
              options={[
                'evm',
                'evm2',
                'evm3',
                'evm4',
                'evm5',
                'near',
              ]}
            />
          )}
        />
        <ControlledField<ExploreFormInput, 'chainId'>
          name="chainId"
          control={control}
          label={i18n.t('exploreForm.chainId.label')}
          render={({ id, field }) => (
            <Input
              id={id}
              {...field}
              className={formElementClassName}
              placeholder={i18n.t('exploreForm.chainId.placeholder')}
            />
          )}
        />
        <ControlledField<ExploreFormInput, 'address'>
          name="address"
          control={control}
          label={i18n.t('exploreForm.address.label')}
          render={({ id, field }) => (
            <Input
              id={id}
              {...field}
              className={formElementClassName}
              placeholder={addressPlaceholder}
            />
          )}
        />
        <ControlledField<ExploreFormInput, 'tokenId'>
          name="tokenId"
          control={control}
          label={i18n.t('exploreForm.tokenId.label')}
          render={({ id, field }) => (
            <Input
              id={id}
              {...field}
              className={classNames(formElementClassName, 'xs:tw-max-w-[6rem]')}
              placeholder={i18n.t('exploreForm.tokenId.placeholder')}
              disabled
            />
          )}
        />
      </div>

      <ErrorMessage error={errors.root} />

      <Button
        type="submit"
        className="tw-w-full xs:tw-w-auto"
        iconRight={
          <Icon className="tw-mirror-x" icon={searchIcon} />
        }
      >
        {i18n.t('submit')}
      </Button>
    </form>
  )
}
