import classNames from 'classnames'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { WithClassName } from '../../models'

interface SkeletonContextType {
  loaded?: boolean
}

interface SkeletonPlaceholderProps {
  as?: keyof JSX.IntrinsicElements
  size?: string | number
  height?: string | number
  width?: string | number
}

interface SkeletonElementProps extends SkeletonPlaceholderProps {
  placeholder?: ReactNode
}

type SkeletonRootProps = SkeletonContextType

const SkeletonContext = createContext<SkeletonContextType>({
  loaded: undefined,
})

const Placeholder: FC<WithClassName<SkeletonPlaceholderProps>> = (props) => {
  const {
    as: Wrapper = 'span',
    size,
    height = size ?? '1em',
    width = size ?? '100%',
    className,
  } = props

  return (
    <Wrapper
      className={classNames('tw-animate-pulse tw-inline-flex tw-rounded tw-bg-dim-2', className)}
      style={{ width, height }}
    />
  )
}

const Element: FC<PropsWithChildren<WithClassName<SkeletonElementProps>>> = (props) => {
  const {
    placeholder,
    children,
  } = props

  const loaded = useContext(SkeletonContext).loaded ?? true

  if (loaded) {
    return <>{children}</>
  }

  return placeholder
    ? <>placeholder</>
    : <Placeholder {...props} />
}

const Root: FC<PropsWithChildren<Required<SkeletonRootProps>>> = (props) => {
  const { children, loaded } = props

  return (
    <SkeletonContext.Provider value={{ loaded }}>
      {children}
    </SkeletonContext.Provider>
  )
}

export const Skeleton = { Root, Element, Placeholder }
