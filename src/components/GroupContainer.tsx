import type { FC, PropsWithChildren } from 'react'

interface Props {
  heading?: string
}

export const GroupContainer: FC<PropsWithChildren<Props>> = ({ children, heading }) => {
  return (
    <div className="sm:tw-rounded-xl sm:tw-bg-card tw-border-b sm:tw-border tw-border-separator-muted tw-pb-5 sm:tw-p-5">
      <h4>{heading}</h4>
      <div>
        {children}
      </div>
    </div>
  )
}
