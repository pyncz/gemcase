import type { Nullable } from '@voire/type-utils'
import { useEffect, useState } from 'react'

export const useResetableState = <T>(
  defaultValue: T,
  resetTimeout: Nullable<number> = 1000,
) => {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const reset = () => {
      setValue(defaultValue)
    }

    if (value !== defaultValue && resetTimeout !== null) {
      const id = setTimeout(reset, resetTimeout)
      return () => clearTimeout(id)
    }
  }, [value, defaultValue, resetTimeout])

  return [value, setValue] as ReturnType<typeof useState<T>>
}
