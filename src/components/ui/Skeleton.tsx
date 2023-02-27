import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'

interface SkeletonContextType {
  loaded: boolean
}

interface SkeletonElementProps {
  height?: string | number
  width?: string | number
  as?: keyof JSX.IntrinsicElements
}

type SkeletonRootProps = SkeletonContextType

const SkeletonContext = createContext<SkeletonContextType>({
  loaded: false,
})

const Element: FC<PropsWithChildren<SkeletonElementProps>> = (props) => {
  const {
    as: Wrapper = 'span',
    height = '1em',
    width = '100%',
    children,
  } = props

  const { loaded } = useContext(SkeletonContext)

  if (loaded) {
    return <Wrapper>{children}</Wrapper>
  }

  return (
    <Wrapper
      className="tw-animate-pulse tw-inline-flex tw-rounded tw-bg-dim-2"
      style={{ width, height }}
    />
  )
}

const Root: FC<PropsWithChildren<SkeletonRootProps>> = (props) => {
  const { children, loaded } = props

  return (
    <SkeletonContext.Provider value={{ loaded }}>
      {children}
    </SkeletonContext.Provider>
  )
}

export const Skeleton = { Root, Element }
