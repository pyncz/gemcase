import { ServerErrorSummary } from '../components'
import { PageLayoutMessage } from '../layouts'
import type { NextPageWithLayout } from '../models'

const NotFound: NextPageWithLayout = () => {
  return (
    <ServerErrorSummary code={404}>
      404 heh
    </ServerErrorSummary>
  )
}

NotFound.Layout = PageLayoutMessage

export default NotFound
