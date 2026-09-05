import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Cpu, 
  Smartphone, 
  Globe2, 
  BookOpen, 
  Check, 
  Layers, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Wifi,
  UserCheck
} from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function LandingPage({ 
  onNavigateToDynamic, 
  onNavigateToStatic, 
  onNavigateToBlog, 
  onNavigateToCompare, 
  onNavigateToDashboard 
}) {
  const [demoStyle, setDemoStyle] = useState('rounded');
  const [demoColor, setDemoColor] = useState('#10B981');

  return (
    <div className="space-y-20 pb-16">
      
      {/* Top Header Sponsor Ad */}
      <AdBanner type="leaderboard" className="pt-2" />

      {/* 1. Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>The Open Dynamic QR Platform • 100% Free Forever</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
          Dynamic QR Codes That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-emerald-400 to-cyanGlow-500">
            Never Expire.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          High-resolution QR code generator with real-time redirect tracking, deep scan analytics, and vector exports. Change destination URLs anytime without re-printing physical materials.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onNavigateToDynamic}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:brightness-110 text-dark-950 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-glow-emerald transition-all transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-dark-950" />
            <span>Create Dynamic QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onNavigateToStatic}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-dark-900 hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span>Quick Static Generator</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-mono">
              NO LOGIN
            </span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            <span>Sub-50ms Fast 302 Redirects</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            <span>Vector SVG & Print-Ready PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            <span>No 14-Day Expiration Trap</span>
          </div>
        </div>
      </section>

      {/* 2. Dynamic vs Static Visual Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Choose the Right QR Code for Your Needs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Whether you need permanent offline encoding or trackable redirect links, QRLoop has you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Dynamic Card */}
          <div className="rounded-3xl border-2 border-brand-500/30 bg-gradient-to-br from-brand-50/50 via-white to-emerald-50/20 dark:from-brand-950/30 dark:via-dark-900 dark:to-dark-950 p-6 sm:p-8 backdrop-blur-xl shadow-md dark:shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-500 text-dark-950 font-mono shadow-xs">
                RECOMMENDED FOR PRINT
              </span>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dynamic QR Codes</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  The destination URL can be changed anytime from your dashboard without re-printing.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span><strong>Change links anytime:</strong> fix typos or switch campaigns</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span><strong>Live scan telemetry:</strong> total scans, devices, OS, and countries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span><strong>Clean scannable matrix:</strong> short URL prevents pixel crowding</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={onNavigateToDynamic}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-emerald transition-all"
              >
                <span>Launch Dynamic QR Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Static Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-none flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Wifi className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Static QR Codes</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Data is burned directly into the black and white pixel pattern. No server needed.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span><strong>Works 100% offline:</strong> no server or internet routing needed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span><strong>Instant download:</strong> no account or login required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span><strong>Ideal for Wi-Fi & vCards:</strong> permanent static payloads</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={onNavigateToStatic}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 transition-all"
              >
                <span>Launch Static Generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-brand-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Sub-50ms Fast Redirects</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Asynchronous scan logging means visitors are redirected to your website immediately without delay or intermediate splash screens.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-cyan-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Print-Ready PDF & SVG</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Export lossless vector SVG for commercial printing or auto-generate centered A4 printable table standees with one click.
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
      </section>

      {/* 4. Blog & Educational Guides Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Knowledge Hub
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">
              Latest Guides & Tutorials
            </h2>
          </div>

          <button
            onClick={onNavigateToBlog}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={onNavigateToBlog}
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-brand-500/40 transition-all cursor-pointer shadow-xs dark:shadow-none space-y-2 group"
          >
            <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400">Industry Warning</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              The 14-Day QR Paywall Trap: How Paid Services Hold Your Links Hostage
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              Learn how commercial generators bait users into printing brochures before locking links behind monthly subscriptions.
            </p>
          </div>

          <div
            onClick={onNavigateToBlog}
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-brand-500/40 transition-all cursor-pointer shadow-xs dark:shadow-none space-y-2 group"
          >
            <span className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400">Best Practices</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              Dynamic vs Static QR Codes: The Complete Business Guide
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              A comprehensive checklist to choose between static and dynamic codes for product packaging and marketing.
            </p>
          </div>

          <div
            onClick={onNavigateToBlog}
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-brand-500/40 transition-all cursor-pointer shadow-xs dark:shadow-none space-y-2 group"
          >
            <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">Print & Design</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              Professional QR Print Specifications: The 10:1 Scanning Rule
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              Essential guidelines on resolution, quiet zone margins, and contrast ratios for crisp camera scanning.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Competitor Comparison Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md dark:shadow-2xl transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                100% Free • No Subscription
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              Why pay $35/month for dynamic QR codes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              See how QRLoop compares against QRCode Monkey, Bitly, and Uniqode. No scan limits, no locked links.
            </p>
          </div>

          <button
            onClick={onNavigateToCompare}
            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-slate-900 dark:border-white/10 transition-all flex-shrink-0 shadow-sm"
          >
            <span>Compare vs Paid Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
