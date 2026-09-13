import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, ExternalLink } from 'lucide-react';

export default function CookieConsent({ onNavigate }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('qrloop_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth appearance
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('qrloop_cookie_consent', 'all');
    setVisible(false);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('qrloop_cookie_consent', 'essential');
    setVisible(false);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in">
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-2xl space-y-3.5 transition-all text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                We Value Your Privacy
              </h4>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                EU User Consent & Cookie Settings
              </span>
            </div>
          </div>
          <button
            onClick={handleEssentialOnly}
            aria-label="Close and decline non-essential cookies"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text */}
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          QRLoop and its advertising partners (including Google AdSense) use cookies to analyze site traffic, 
          deliver personalized advertisements, and support our 100% free dynamic QR service.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Accept All</span>
          </button>

          <button
            onClick={handleEssentialOnly}
            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-750 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-white/10 transition-colors"
          >
            Essential Only
          </button>

          <button
            onClick={() => onNavigate('cookies')}
            className="py-2 px-2.5 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-medium transition-colors"
            title="Learn more about our cookie policy"
          >
            <span>Learn More</span>
          </button>
        </div>

      </div>
    </div>
  );
}
