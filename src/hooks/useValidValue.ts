import type { Nullable } from '@voire/type-utils'
import { useMemo } from 'react'
import type { Control, Path, PathValue, UseFormWatch } from 'react-hook-form'

export const useValidValue = <
  TForm extends Record<string, any>,
  TName extends Path<TForm>,
>(control: Control<TForm>, watch: UseFormWatch<TForm>, name: TName) => {
  const value = watch(name)
  const { invalid } = control.getFieldState(name)

  const validValue = useMemo<
    Nullable<PathValue<TForm, TName>>
  >(() => {
    return invalid ? null : value
  }, [invalid, value])

  return validValue
}
