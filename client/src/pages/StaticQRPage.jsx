import React from 'react';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import QRStudio from '../components/QRStudio';
import AdBanner from '../components/AdBanner';

export default function StaticQRPage({ onBackToHome, onNavigateToDynamic }) {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/5">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                Static QR Code Generator
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-mono">
                100% Instant • No Login
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Generate permanent, offline-capable static QR codes. Direct data encoding with zero server tracking or expiration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToDynamic}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-500/15 hover:bg-brand-500/25 text-brand-700 dark:text-brand-300 border border-brand-500/30 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-brand-500" />
              <span>Need Trackable Redirects? Switch to Dynamic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Studio in pure static mode */}
      <QRStudio
        forcedDynamic={false}
      />

      {/* Static vs Dynamic Info Callout */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>What is a Static QR Code?</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Static QR codes encode the data directly into the matrix pattern (like raw text or Wi-Fi credentials). They do not pass through a redirect server and will work offline forever without an internet connection. However, their destination cannot be changed once printed.
            </p>
          </div>

          <button
            onClick={onNavigateToDynamic}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-dark-950 hover:brightness-110 whitespace-nowrap shadow-sm"
          >
            Explore Dynamic QRs →
          </button>
        </div>
      </div>

      <AdBanner type="leaderboard" />

    </div>
  );
}
