import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export default function AdBanner({ type = 'leaderboard', className = '' }) {
  if (type === 'leaderboard') {
    return (
      <div className={`w-full max-w-4xl mx-auto my-6 px-4 ${className}`}>
        <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/5 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs dark:shadow-lg group transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase px-1.5 py-0.5 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
              SPONSORED
            </span>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  Enterprise Cloud Infrastructure for High-Volume QRs
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Deliver sub-50ms redirect latencies globally with distributed edge caching.
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all"
          >
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className={`w-full rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 p-4 relative overflow-hidden shadow-xs dark:shadow-none transition-colors ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5">
            PARTNER SPOTLIGHT
          </span>
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        </div>

        <div className="space-y-2.5">
          <div className="w-full h-24 rounded-xl bg-gradient-to-br from-brand-100 via-slate-100 to-cyan-100 dark:from-brand-900/30 dark:via-dark-800 dark:to-cyan-900/20 border border-slate-200 dark:border-white/5 flex flex-col justify-center items-center text-center p-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white mb-1">Vector Print Studio</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">CMYK 300DPI QR stickers & aluminum stands</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Need physical waterproof QR tags for tables, storefronts, or exhibition booths?
          </p>

          <a
            href="#compare"
            className="block w-full text-center py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-brand-700 dark:text-brand-300 border border-brand-500/20 hover:border-brand-500/40 transition-all"
          >
            Get Free Print Templates
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-dark-900/40 flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">AD</span>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Supercharge your marketing funnels with custom branded short domains.
        </p>
      </div>
      <a
        href="#compare"
        className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-medium whitespace-nowrap"
      >
        <span>Explore Pro</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
