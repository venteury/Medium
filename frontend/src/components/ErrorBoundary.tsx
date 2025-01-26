import { Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: null | Error;
  errorInfo: null | Object;
}

interface ErrorBoundaryProps {
  navigate: (path: string) => void;
  children: React.ReactNode; // Any React children passed to the ErrorBoundary
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: Object) {
    console.error(error, errorInfo); // eslint-disable-line

    if (!navigator.onLine) {
      alert("You are offline. Check your internet connection and try again.");
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-h-screen  p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl bg-white rounded-lg">
            {/* Header */}
            <div className="border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => this.props.navigate("/")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">An error occurred</h2>
                  <p className="text-gray-500">{new Date().toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg mb-2">
                  Something went wrong. Please try again later.
                </p>
                {!navigator.onLine && (
                  <p className="text-red-500 mb-2">
                    No internet connection. Please check your connection.
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => this.props.navigate("/")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
