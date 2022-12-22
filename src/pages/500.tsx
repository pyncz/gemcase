import { ServerErrorSummary } from '../components'
import { PageLayoutMessage } from '../layouts'
import type { NextPageWithLayout } from '../models'

const InternalServerError: NextPageWithLayout = () => {
  return (
    <ServerErrorSummary code={500}>
      500 oops
    </ServerErrorSummary>
  )
}

InternalServerError.Layout = PageLayoutMessage

export default InternalServerError
