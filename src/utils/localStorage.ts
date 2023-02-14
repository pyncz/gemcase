import type { Optional } from '@voire/type-utils'

export const loadState = <T = string>(key: string): Optional<T> => {
  try {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value) as T
    }
  } catch (e) {}
}

export const saveState = <T = string>(key: string, value: T): void => {
  try {
    if (!value) {
      localStorage.removeItem(key)
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {}
}
