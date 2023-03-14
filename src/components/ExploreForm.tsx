import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { Icon } from '@iconify-icon/react'
import searchIcon from '@iconify-icons/ion/search-outline'
import { z } from 'zod'
import { useRouter } from 'next/router'
import type { ChainPath, Web3PublicConfig } from '../models'
import { useValidValue } from '../hooks'
import { trpcClient } from '../utils'
import { positiveNumberLike } from '../models'
import { Button, ControlledField, ErrorMessage, Input, Select } from './ui'
import { BlockchainRepresentation } from './representations/BlockchainRepresentation'
import { ChainRepresentation } from './representations/ChainRepresentation'
import { Web3EntityRepresentation } from './representations'
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
          ? trpcClient.validate.validateAddress.query({ blockchain, chain, address })
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

      <div className="tw-w-full md:tw-w-auto tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 sm:tw-gap-6">
        <Button
          type="submit"
          className=""
          iconRight={
            <Icon className="tw-mirror-x" icon={searchIcon} />
          }
        >
          {i18n.t('view')}
        </Button>

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
                : null
              }
            />
          : null
        }
      </div>
    </form>
  )
}
