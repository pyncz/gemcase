import type { FC, PropsWithChildren } from 'react'

interface Props {
  title?: string
}

export const GroupContainer: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <div className="sm:tw-rounded-xl sm:tw-bg-card tw-border-b sm:tw-border tw-border-separator-muted tw-pb-5 sm:tw-p-5 sm:tw-pb-6">
      <h4>{title}</h4>
      <div>
        {children}
      </div>
    </div>
  )
}
