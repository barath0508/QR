/**
 * Sends a product event to Google Analytics when the site tag is available.
 * Keeping this optional lets the app work normally with ad blockers or without analytics.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
