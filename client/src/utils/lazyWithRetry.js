import { lazy } from 'react';

/**
 * Enhanced React.lazy wrapper that handles chunk loading failures after new deployments.
 * When a new deployment is pushed to production, previous bundle chunk hashes are replaced.
 * If a user with an active browser tab tries to dynamically load an older chunk hash,
 * this automatically detects the chunk failure and reloads the page once to retrieve
 * the latest HTML document and new asset bundles.
 */
export function lazyWithRetry(componentImport) {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      const errorMsg = (error && error.message) ? error.message : '';
      const isChunkError =
        errorMsg.includes('Failed to fetch dynamically imported module') ||
        errorMsg.includes('Failed to load module script') ||
        errorMsg.includes('Expected a JavaScript-or-Wasm module script') ||
        errorMsg.includes('error loading dynamically imported module') ||
        error?.name === 'TypeError';

      if (isChunkError && typeof window !== 'undefined') {
        const lastReload = window.sessionStorage.getItem('qrloop_chunk_reload');
        const now = Date.now();

        // Prevent infinite reload loops (allow max 1 reload attempt per 15 seconds)
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          window.sessionStorage.setItem('qrloop_chunk_reload', now.toString());
          console.warn('[QRLoop] Stale deployment chunk detected. Auto-refreshing page for latest version...');
          window.location.reload();
          // Return an unresolved promise so React doesn't crash before the page reload takes effect
          return new Promise(() => {});
        }
      }

      throw error;
    }
  });
}
