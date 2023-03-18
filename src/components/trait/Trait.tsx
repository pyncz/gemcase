import type { FC } from 'react'
import type { TokenTrait } from '../../models'
import { Attribute } from '../Attribute'
import { TraitNumber } from './TraitNumber'

interface Props {
  trait: string | TokenTrait
}

export const Trait: FC<Props> = ({ trait }) => {
  if (typeof trait === 'string') {
    return <Attribute>{trait}</Attribute>
  }

  const numberValue = Number(trait.value)

  return (
    <Attribute label={trait.trait_type} textValue={trait.value}>
      {trait.display_type === 'number' && !isNaN(numberValue)
        ? <TraitNumber value={numberValue} max={trait.max_value} />
        : trait.value
      }
    </Attribute>
  )
}
