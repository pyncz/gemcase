export function debounce<Params extends any[], Return>(
  func: (...args: Params) => Return,
  timeout: number,
): (...args: Params) => Promise<Return> {
  let timer: NodeJS.Timeout

  return (...args: Params) => {
    return new Promise((resolve) => {
      clearTimeout(timer)
      timer = setTimeout(() => resolve(func(...args)), timeout)
    })
  }
}
