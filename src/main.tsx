import {Component, StrictMode, type ErrorInfo, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { Ga4 } from './components/analytics/Ga4.tsx';
import './index.css';

class RootErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Storefront crashed', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
          <div>
            <p className="text-lg font-bold text-slate-900">Something went wrong</p>
            <p className="mt-2 text-sm text-slate-500">Refresh the page, or try again in a moment.</p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <Ga4 />
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);
