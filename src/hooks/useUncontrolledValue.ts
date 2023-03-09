import { useMemo, useState } from 'react'

export const useUncontrolledValue = <TValue>(value: TValue, defaultValue: TValue) => {
  // Track the value locally since the "value" prop can be not provided
  // in case of no-control approach
  const [localValue, setLocalValue] = useState<TValue>(defaultValue)

  const actualValue = useMemo(() => {
    return value ?? localValue
  }, [value, localValue])

  return [actualValue, setLocalValue] as ReturnType<typeof useState<TValue>>
}
