export type Empty<T> = {
  [P in keyof T]?: undefined
}

export type OrEmpty<T> = T | Empty<T>
