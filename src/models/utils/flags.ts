export type Flags<T extends string> = {
  [key in T]: boolean
}
