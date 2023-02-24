export type InDict<T extends Record<string, string | string[]>> = T & {
  [key: string]: string | undefined
}
