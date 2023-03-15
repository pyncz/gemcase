import { withQuery } from 'ufo'
import { APP_TWITTER_HANDLE } from '../../consts'
import { createSharer } from './createSharer'

const formatHashtags = (tags?: string[], delimiter = ' ') => {
  return tags
    ?.map(tag => tag.replace(/[-\s]/g, '_'))
    ?.join(delimiter) ?? ''
}

const addHashes = (tags?: string[]) => {
  return tags?.map(tag => tag.startsWith('#') ? tag : `#${tag}`)
}

const withNewLine = (message?: string) => {
  return message ? `\n${message}` : ''
}

export const sharer = createSharer({
  telegram({ url, message, hashtags }): string {
    return withQuery('https://t.me/share/url', {
      url,
      text: `${message}${withNewLine(formatHashtags(addHashes(hashtags), ' '))}`,
    })
  },

  facebook({ url, message, hashtags }): string {
    return withQuery('https://www.facebook.com/sharer/sharer.php', {
      u: url,
      quote: `${message}${withNewLine(formatHashtags(addHashes(hashtags), ' '))}`,
    })
  },

  twitter({ url, message, hashtags }): string {
    return withQuery('https://twitter.com/intent/tweet', {
      url,
      text: message,
      hashtags: formatHashtags(hashtags, ','),
      via: APP_TWITTER_HANDLE,
    })
  },
})
