import React from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Download, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Cpu,
  Smartphone,
  Globe2
} from 'lucide-react';
import QRStudio from '../components/QRStudio';
import AdBanner from '../components/AdBanner';

export default function LandingPage({ 
  user, 
  onSavedQR, 
  onNavigateToDashboard, 
  onNavigateToAnalytics,
  onNavigateToCompare 
}) {
  return (
    <div className="space-y-16 pb-12">
      
      {/* Top Header Ad Placement (IAB 728x90) */}
      <AdBanner type="leaderboard" className="pt-2" />

      {/* Hero Intro */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>The Next-Gen Dynamic QR Engine • Free & Unlimited</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Create Dynamic QR Codes That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-emerald-400 to-cyanGlow-500">
            Never Expire.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Generate high-resolution QR codes with custom colors, rounded shapes, and center logos. Change destination links anytime without re-printing physical materials.
        </p>
      </div>

      {/* Embedded Live Interactive Generator Studio */}
      <QRStudio
        user={user}
        onSavedQR={onSavedQR}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToAnalytics={onNavigateToAnalytics}
      />

      {/* Value Propositions & Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Why Professionals Choose QRLoop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Built for marketers, developers, and small businesses who refuse to get locked into overpriced monthly plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-brand-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Sub-50ms Fast Redirects</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our high-speed 302 redirect engine logs device and location metrics asynchronously so your visitors reach their destination with zero perceptible delay.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-cyan-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Print-Ready PDF & SVG</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Export lossless vector SVG for commercial printing presses or auto-generate clean A4 printable flyers and table standees with one click.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-purple-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Real-Time Scan Telemetry</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitor scan spikes, operating systems (iOS vs Android), browsers, and top geographic locations without setting up heavy analytics scripts.
            </p>
          </div>

        </div>
      </div>

      {/* Competitor Banner Teaser */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md dark:shadow-2xl transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Zero Hidden Charges
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              Tired of $35/month QR subscriptions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              See the direct side-by-side comparison between QRLoop and commercial competitors like QRCode Monkey, Bitly, and Uniqode.
            </p>
          </div>

          <button
            onClick={onNavigateToCompare}
            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-slate-900 dark:border-white/10 transition-all flex-shrink-0 shadow-sm"
          >
            <span>View Full Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
