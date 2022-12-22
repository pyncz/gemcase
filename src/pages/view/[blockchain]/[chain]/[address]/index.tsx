import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from '../../../../../models'

export const getServerSideProps: GetServerSideProps = async ({
  params, locale, query,
}) => {
  console.log(params, locale, query)

  // | { props: P | Promise<P> }
  // | { redirect: Redirect }
  // | { notFound: true }
  return {
    notFound: true,
    props: {
      evm: 'sdfsdf',
    },
  }
}

const ViewAddress: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const router = useRouter()
  const { address } = router.query

  return (
    <>
      address!
      {address}
      <Link href="/view/bc:chainnnn">Chain</Link>
    </>
  )
}

export default ViewAddress
