import { useResetableState } from './useResetableState'

export const useCopyToClipboard = (value: string) => {
  const [justCopied, setJustCopied] = useResetableState(false, 2000)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setJustCopied(true)
  }

  return { copy, justCopied }
}
