import type { FC, PropsWithChildren, ReactNode } from 'react'

interface Props {
  heading: ReactNode
}

export const Summary: FC<PropsWithChildren<Props>> = (props) => {
  const { heading, children } = props

  return (
    <div className="tw-space-y-0.5 tw-max-w-[15rem] tw-mx-auto">
      <div className="tw-font-bold">
        {heading}
      </div>

      {children}
    </div>
  )
}
