import type { ReactNode } from 'react'
import type { Control, ControllerRenderProps, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { WithClassName } from '../../../models'
import { Field } from './Field'

interface Props<
  TForm extends Record<string, any> = Record<string, any>,
  TName extends Path<TForm> = Path<TForm>,
> {
  // Controller props
  name: TName
  control: Control<TForm>
  render: (payload: {
    id: string
    field: ControllerRenderProps<TForm, TName>
  }) => ReactNode
  // Field props
  label?: string
}

export const ControlledField = <
  TForm extends Record<string, any> = Record<string, any>,
  TName extends Path<TForm> = Path<TForm>,
>(props: WithClassName<Props<TForm, TName>>) => {
  const { name, control, render, ...fieldProps } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          {...fieldProps}
          error={fieldState.error}
          render={id => render({ id, field })}
        />
      )}
    />
  )
}
