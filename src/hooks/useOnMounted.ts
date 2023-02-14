import { useEffect, useState } from 'react'

export const useOnMounted = <TValue>(
  initialize: () => TValue,
  initValue: TValue,
) => {
  const [value, setValue] = useState<TValue>(initValue)

  useEffect(() => {
    setValue(initialize())
  }, [initialize])

  return [value, setValue] as ReturnType<typeof useState<TValue>>
}
