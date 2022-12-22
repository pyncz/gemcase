import type { ErrorInfo, PropsWithChildren } from 'react'
import React from 'react'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<PropsWithChildren, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          {/* Stretch error boundary on all the available space */}
          <div className="tw-flex tw-h-full tw-w-full tw-flex-center">
            <div>
              <h1>Sorry... there was an error</h1>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again?
              </button>
            </div>
          </div>
        </>
      )
    }

    return this.props.children
  }
}
