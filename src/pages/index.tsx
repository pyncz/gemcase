import { type NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'

import type {
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { trpc } from '../utils/trpc'
import { LocaleSwitcher, ThemeSwitcher } from '../components'
import IconIceCream from '~icons/ion/ice-cream'

interface Props {
  // Add custom props here
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en-US', [
      'common',
    ])),
  },
})

const Home: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = () => {
  const { i18n } = useTranslation()

  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  const greeting = trpc.example.hello.useQuery({ text: 'fsdf' }).data?.greeting ?? ''

  const doubleCount1 = useMemo(() => {
    console.log('computed count1')
    return count1 * 2
  }, [count1])

  const doubleCount2 = useMemo(() => {
    console.log('computed count2')
    return count2 * 2
  }, [count2])

  return (
    <>
      <Head>
        <title>{i18n.t('pages.index.title')}</title>
        <meta property="og:title" content={i18n.t('pages.index.title')} key="title" />
        <meta name="description" content={i18n.t('pages.index.description')} key="description" />
      </Head>

      <LocaleSwitcher />
      <ThemeSwitcher />

      <div>
        {greeting}
      </div>
      <IconIceCream />
      <div>
        {count1}
        {doubleCount1}
        <button className="tw-p-4 tw-bg-accent-primary" onClick={() => setCount1(count1 + 1)}>Count1++</button>
      </div>

      <div>
        {count2}
        {doubleCount2}
        <button className="tw-p-4 tw-bg-accent-secondary" onClick={() => setCount2(count2 + 1)}>Count2++</button>
      </div>
    </>
  )
}

export default Home
