import { z } from 'zod'
import { bigintLike } from './bigintLike'
import { numberLike } from './numberLike'

export const intLike = z.union([numberLike, bigintLike])
