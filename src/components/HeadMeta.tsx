import Head from 'next/head'
import type { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { getAbsoluteBaseUrl } from '../utils'

interface Props {
  pageTitle?: string

  title?: string
  description?: string
  type?: string
  image?: string
}

export const HeadMeta: FC<PropsWithChildren<Props>> = (props) => {
  const {
    title,
    pageTitle = title,
    description,
    type = 'website',
    image,

    children,
  } = props

  const router = useRouter()
  const basePath = getAbsoluteBaseUrl()

  const href = `${basePath}${router.asPath}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} key="description" />

      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-description" />
      <meta property="og:site_name" content="gemcase" key="og-site_name" />
      <meta property="og:url" content={href} key="og-url" />
      <meta property="og:type" content={type} key="og-type" />
      {image ? <meta property="og:image" content={image} key="og-image" /> : null}

      {children}
    </Head>
  )
}
