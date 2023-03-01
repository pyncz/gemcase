import { formatUnits } from 'ethers'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { PriceData } from '../models'

type Props = PriceData & {
  fixTo?: number
}

export const Price: FC<Props> = (props) => {
  const {
    value,
    symbol,
    decimals = 1,
    fixTo = 2,
  } = props

  const formattedValue = useMemo<string>(() => {
    try {
      // BigNumberish, i.e. an integer
      const bnValue = BigInt(value)
      return decimals === 1
        ? formatUnits(bnValue, decimals)
        : bnValue.toString()
    } catch (e) {
      // not an integer
      return Number(value).toFixed(fixTo)
    }
  }, [value, decimals, fixTo])

  return (
    <>{formattedValue} {symbol}</>
  )
}
