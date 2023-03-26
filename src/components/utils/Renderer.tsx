import type { RendererProps } from '../../models'

type Props<T = unknown> = RendererProps<T> & {
  data?: T
  isLoading: boolean
}

export const Renderer = <
  T = unknown,
>(props: Props<T>) => {
  const {
    render,
    renderData,
    placeholder = null,
    fallback = null,
    data,
    isLoading,
  } = props

  return (
    <>{
      render
        ? render(data, isLoading)
        : isLoading
          ? placeholder
          : data
            ? renderData(data)
            : fallback
      }</>
  )
}
