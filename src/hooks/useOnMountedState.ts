import { useEffect, useState } from 'react'

export const useOnMountedState = <T>(
  initialize: () => T,
  initValue: T | (() => T),
) => {
  const [value, setValue] = useState<T>(initValue)

  useEffect(() => {
    setValue(initialize())
  }, [initialize])

  return [value, setValue] as ReturnType<typeof useState<T>>
}
