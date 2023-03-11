import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { FC, PropsWithChildren } from 'react'

export type PageLayout<P = {}> = FC<PropsWithChildren<P>>

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: PageLayout
}

export type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}
