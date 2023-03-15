import classNames from 'classnames'
import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import type { WithClassName } from '../../models'

interface Props {
  content: string
}

export const Markdown: FC<WithClassName<Props>> = (props) => {
  const { content: mdContent, className } = props

  return (
    <ReactMarkdown
      className={classNames('tw-whitespace-pre-line', className)}
    >{mdContent}</ReactMarkdown>
  )
}
