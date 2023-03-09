export type OmitListeners<T> = Omit<T, `on${string}`>
