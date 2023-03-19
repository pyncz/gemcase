import type { FC, PropsWithChildren } from 'react'

interface Props {
  if?: boolean
}

export const Whiten: FC<PropsWithChildren<Props>> = (props) => {
  const { if: enable = true, children } = props

  return (
    <span style={{ filter: enable ? 'invert(0.5) saturate(0.5) brightness(10)' : undefined }}>
      {children}
    </span>
  )
}
