import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import classNames from 'classnames'
import i18nextConfig from '../../next-i18next.config'
import type { NextPageWithLayout, Web3PublicConfig } from '../models'
import { ExploreForm, HeadMeta } from '../components'
import { PageLayoutMessage } from '../layouts'
import { web3PublicConfig } from '../services/web3Adapter'

type Props = Web3PublicConfig

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => {
  return {
    props: {
      ...web3PublicConfig,
      ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, [
        'common',
      ])),
    },
  }
}

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { i18n } = useTranslation()

  return (
    <>
      <HeadMeta
        title={i18n.t('pages.index.title')}
        description={i18n.t('pages.index.description')}
      />

      <section className="tw-space-y-title">
        <h1
          className={classNames(
            'tw-mb-0 tw-bg-blend-overlay xs:tw-text-[3rem] tw-relative',
            'before:tw-scale-y-[2.5] before:tw--rotate-6 before:tw-animate-damping before:tw-opacity-[var(--o-rainbows)] before:tw-absolute before:tw-inset-0 before:tw-z-muted',
            'before:tw-bg-[radial-gradient(35%_45%_at_35%_45%,_rgb(var(--c-i-base),_0.3),_rgba(var(--c-i-base),_0)),_radial-gradient(30%_50%_at_50%_50%,_rgb(var(--c-i-accent-5),_0.2),_rgba(var(--c-i-accent-5),_0)),_radial-gradient(35%_45%_at_65%_55%,_rgb(var(--c-i-accent-4),_0.3),_rgba(var(--c-i-accent-4),_0)),_radial-gradient(30%_30%_at_70%_60%,_rgb(var(--c-i-accent-1),_0.4),_rgba(var(--c-i-accent-1),_0)),_radial-gradient(45%_0.125em_at_center,_rgb(var(--c-i-accent-2),_0.4),_rgba(var(--c-i-accent-2),_0))] before:tw-blur-sm',
          )}
        >
          <Trans
            i18nKey="index.title"
            components={[
              <span
                key="1"
                className="tw-drop-shadow-glow tw-inline-flex tw-scale-[1.05] tw-origin-[center_90%]"
                style={{
                  WebkitTextStroke: '1px',
                  WebkitTextStrokeColor: 'rgb(var(--c-emphasize))',
                  WebkitTextFillColor: 'rgba(var(--c-emphasize-bg), var(--o-emphasize-bg))',
                }}
              />,
            ]}
          />
        </h1>

        <ExploreForm {...props} />
      </section>
    </>
  )
}

Home.Layout = PageLayoutMessage

export default Home
