import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { FC, PropsWithChildren } from 'react'

export type PageLayout = FC<PropsWithChildren>

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: PageLayout
}

export type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout
}
