import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center border-4 border-black p-12">
            <h1 className="font-sans font-black italic text-4xl uppercase tracking-tighter mb-4">
              Something Broke
            </h1>
            <p className="text-sm text-gray-600 uppercase tracking-widest font-bold mb-8">
              The Syndicate hit a wall. We're on it.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-block bg-black text-white px-8 py-4 font-black italic uppercase tracking-widest text-sm hover:bg-white hover:text-black border-4 border-black transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
