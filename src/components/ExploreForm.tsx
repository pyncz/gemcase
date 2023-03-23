import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { Icon } from '@iconify-icon/react'
import viewIcon from '@iconify/icons-ion/arrow-forward-outline'
import { z } from 'zod'
import { useRouter } from 'next/router'
import type { ChainPath, Web3PublicConfig } from '../models'
import { useValidValue } from '../hooks'
import { trpc } from '../utils'
import { positiveNumberLike } from '../models'
import { ControlledField, ErrorMessage, Input, Select } from './ui'
import { BlockchainRepresentation, ChainRepresentation, Web3EntityRepresentation } from './representations'
import { RenderWeb3Metadata } from './RenderWeb3Metadata'

type Props = Partial<ChainPath> & Web3PublicConfig

export const ExploreForm: FC<Props> = (props) => {
  const {
    blockchain: initBlockchain,
    chain: initChain,
    blockchains,
  } = props
  const { i18n } = useTranslation()

  const exploreFormSchema = z
    .object({
      blockchain: z.string().refine(
        val => !!blockchains[val],
        {
          message: i18n.t('errors.invalidBlockchain'),
          path: ['blockchain'],
        },
      ),
      chain: z.string(),
      address: z.string(),
      tokenId: positiveNumberLike.optional(),
    })
    .refine(
      ({ blockchain, chain }) => !!blockchains[blockchain]?.chains[chain],
      ({ blockchain }) => ({
        message: i18n.t('errors.invalidChain', { blockchain }),
        path: ['chain'],
      }),
    )
    .refine(
      async ({ blockchain, chain, address }) => {
        // TODO: Validate on client too?
        return blockchain && chain && address
          ? trpc.useContext().validate.validateAddress.fetch({ blockchain, chain, address })
          : false
      },
      ({ blockchain }) => ({
        message: i18n.t('errors.invalidAddress', { blockchain }),
        path: ['address'],
      }),
    )

  type ExploreFormInput = z.infer<typeof exploreFormSchema>

  const {
    handleSubmit,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useForm<ExploreFormInput>({
    /**
     * Check how to debug resolver:
     * @see https://react-hook-form.com/api/useform/#resolver
     */
    resolver: zodResolver(exploreFormSchema, { async: true }),

    defaultValues: {
      blockchain: initBlockchain,
      chain: initChain,
    },
  })

  /**
   * Blockchain
   */
  // Select blockchain options / value
  const blockchainOptions = useMemo(() => Object.keys(blockchains), [blockchains])

  // Valid blockchain selected
  const blockchain = useValidValue(control, watch, 'blockchain')

  // Reset related fields on the selected blockchain's change
  useEffect(() => {
    resetField('chain')
    resetField('address')
    resetField('tokenId')
  }, [blockchain, resetField])

  /**
   * Chain
   */
  // Select blockchain's chain options / value
  const chains = useMemo(() => {
    return blockchain ? blockchains[blockchain]?.chains ?? {} : {}
  }, [blockchains, blockchain])
  const chainOptions = useMemo(() => Object.keys(chains), [chains])

  // Valid chain selected
  const chain = useValidValue(control, watch, 'chain')

  // Current selected chain's metadata
  const chainConfig = useMemo(() => chain ? chains[chain] : null, [chains, chain])

  /**
   * Address / token
   */
  // Valid address / tokenId provided
  const address = useValidValue(control, watch, 'address')
  const tokenId = useValidValue(control, watch, 'tokenId') ?? undefined

  /**
   * UI stuff
   */
  const formElementClassName = 'tw-w-full md:tw-w-48'

  const addressPlaceholder = useMemo(() => {
    return chainConfig
      ? i18n.t('exploreForm.address.placeholder_chain', { chain: chainConfig.label })
      : i18n.t('exploreForm.address.placeholder')
  }, [i18n, chainConfig])

  const router = useRouter()
  const onSubmit: SubmitHandler<ExploreFormInput> = ({
    blockchain,
    chain,
    address,
    tokenId,
  }) => {
    const tokenUrlSuffix = tokenId ? `/${tokenId}` : ''
    router.push(`/view/${blockchain}/${chain}/${address}${tokenUrlSuffix}`)
  }

  const submitPlaceholder = (
    <span className="tw-text-dim-3 tw-leading-1">{i18n.t('exploreForm.submitPlaceholder')}</span>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-form tw-max-w-sm md:tw-max-w-none">
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
              options={blockchainOptions}
              getTextValue={option => blockchains[option as string]!.label}
              renderOption={option => (
                <BlockchainRepresentation
                  {...blockchains[option as string]!}
                />
              )}
            />
          )}
        />
        <ControlledField<ExploreFormInput, 'chain'>
          name="chain"
          control={control}
          label={i18n.t('exploreForm.chainId.label')}
          render={({ id, field }) => (
            <Select
              id={id}
              {...field}
              disabled={!blockchain}
              className={formElementClassName}
              placeholder={i18n.t('exploreForm.chainId.placeholder')}
              options={chainOptions}
              getTextValue={option => chains[option as string]!.label}
              renderOption={option => (
                <ChainRepresentation
                  {...chains[option as string]!}
                />
              )}
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
              disabled={!chain}
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
              disabled={!address}
              className={classNames(formElementClassName, 'xs:tw-max-w-[6rem]')}
              placeholder={i18n.t('exploreForm.tokenId.placeholder')}
            />
          )}
        />
      </div>

      <ErrorMessage error={errors.root} />

      <button
        type="submit"
        className="tw-group/submit tw-h-auto tw-p-3 tw-flex-center-y tw-shadow-highlight disabled:tw-shadow-none tw-duration-fast tw-rounded tw-w-full tw-max-w-sm tw-border tw-border-separator hover:tw-border-accent-primary focus:tw-border-accent-primary focus-within:tw-border-accent-primary"
      >
        {/* Preview */}
        {blockchain && chain && address
          ? <RenderWeb3Metadata
              blockchain={blockchain}
              chain={chain}
              address={address}
              tokenId={tokenId}
              delay={1000}
              render={metadata => metadata
                ? <Web3EntityRepresentation {...metadata} />
                : submitPlaceholder
              }
            />
          : submitPlaceholder
        }

        <Icon icon={viewIcon} className="tw-duration-fast tw-text-5/4 tw-p-2 sm:tw-hidden tw-ml-auto tw-text-accent-primary group-hover/submit:tw-text-accent-primary-vivid" />
        <div className="tw-button tw-button-primary tw-hidden sm:tw-inline-flex tw-ml-auto group-hover/submit:tw-bg-[rgba(var(--button-bg--hover),_var(--tw-bg-opacity))]">
          {i18n.t('view')}{' '}
          <Icon icon={viewIcon} />
        </div>
      </button>
    </form>
  )
}
