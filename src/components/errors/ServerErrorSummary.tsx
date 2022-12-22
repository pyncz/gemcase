import type { FC, PropsWithChildren } from 'react'

interface Props {
  code?: number
}

export const ServerErrorSummary: FC<PropsWithChildren<Props>> = ({ code, children }) => {
  const errorTitle = code === 404
    ? 'Not Found'
    : code === 500
      ? 'Internal Server Error'
      : 'Unexpected error has occured'

  return (
    <div>
      {code ? <div className="tw-h1">{code}</div> : null}
      <h2>{errorTitle}</h2>

      {children ? <p>{children}</p> : null}
    </div>
  )
}
