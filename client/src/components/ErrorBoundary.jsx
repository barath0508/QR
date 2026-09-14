import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('[QRLoop ErrorBoundary]', error, errorInfo);
    const msg = (error && error.message) ? error.message : '';
    const isChunk =
      msg.includes('dynamically imported module') ||
      msg.includes('Failed to load module script') ||
      msg.includes('Expected a JavaScript-or-Wasm module script');

    if (isChunk && typeof window !== 'undefined') {
      const lastReload = window.sessionStorage.getItem('qrloop_eb_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        window.sessionStorage.setItem('qrloop_eb_reload', now.toString());
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('qrloop_chunk_reload');
      window.sessionStorage.removeItem('qrloop_eb_reload');
      window.sessionStorage.removeItem('qrloop_vite_reload');
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message || '';
      const isChunk =
        msg.includes('dynamically imported module') ||
        msg.includes('Failed to load module script') ||
        msg.includes('Expected a JavaScript-or-Wasm module script');

      return (
        <div className="min-h-[450px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 flex items-center justify-center mx-auto mb-4">
              {isChunk ? (
                <RefreshCw className="w-6 h-6 animate-spin-slow" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              )}
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
              {isChunk ? 'New Version Ready' : 'Display Error Occurred'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {isChunk
                ? 'A new version of QRLoop was just deployed to production. Reload to display the updated application.'
                : 'An unexpected error occurred while loading this view. Reloading will refresh your session.'}
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-dark-950 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
