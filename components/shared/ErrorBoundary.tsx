import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
          <div className="max-w-md w-full mx-4">
            <div className="bg-black/50 border border-gray-800 rounded-2xl p-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                Oops, something went wrong!
              </h1>
              <p className="text-gray-400 mb-6">
                We apologize for the inconvenience. Please try refreshing the
                page or contact support if the problem persists.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-full px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-colors"
                >
                  Go to Homepage
                </button>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 p-4 bg-red-500/10 rounded-xl text-left">
                  <p className="text-sm font-medium text-red-400 mb-2">
                    Error Details:
                  </p>
                  <pre className="text-xs text-red-300 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
