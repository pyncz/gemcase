export const capitalize = (value: string) => {
  return value.length > 1
    ? `${value.slice(0, 1).toUpperCase()} ${value.slice(1)}`
    : value.toUpperCase()
}
