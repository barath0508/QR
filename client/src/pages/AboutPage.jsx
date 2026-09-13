import React from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Heart, 
  Globe2, 
  QrCode, 
  Cpu, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

export default function AboutPage({ onBackToHome, onNavigateToDynamic, onNavigateToContact, onNavigateToBlog }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-slate-800 dark:text-slate-200">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase">
          About QRLoop
        </span>
      </div>

      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Our Origin & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Democratizing Dynamic QR Codes for Creators, Small Businesses & Global Enterprises.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          We built QRLoop to eliminate the deceptive 14-day trial traps and exorbitant monthly subscriptions 
          that have plagued the QR code industry for over a decade.
        </p>
      </div>

      {/* The Origin Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            Why We Founded QRLoop
          </h2>
          <p>
            In recent years, dynamic QR codes became the standard for restaurant menus, event signage, product packaging, 
            and physical marketing collateral. But an alarming pattern emerged: unsuspecting businesses would print thousands 
            of expensive brochures and acrylic standees, only for their dynamic links to be disabled two weeks later with a 
            ransom demand: <em>"Pay $35 to $60 every month, or your codes stop working."</em>
          </p>
          <p>
            An HTTP 302 redirect takes mere milliseconds of server computation. There is no legitimate technical reason 
            why a small restaurant owner or independent artist should have to pay hundreds of dollars per year just to update 
            a menu link.
          </p>
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">
            QRLoop was created to prove that world-class dynamic QR technology, high-speed redirect routing, and privacy-preserving 
            analytics can be 100% free, permanent, and open to all.
          </p>
        </div>

        {/* Feature Visual Bento */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Zap className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sub-50ms Routing</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Distributed edge redirections ensuring instant scans everywhere on Earth.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <ShieldCheck className="w-6 h-6 text-cyan-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero Paywalls</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">No 14-day expiration timers. Your dynamic links remain active indefinitely.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Layers className="w-6 h-6 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Vector Exports</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Lossless SVG & 300 DPI PDF files ready for professional press and billboards.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Cpu className="w-6 h-6 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero-Cookie Telemetry</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Granular device and geographic insights with full GDPR anonymization.</p>
          </div>
        </div>
      </div>

      {/* Engineering Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
          Our Core Engineering Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Reliability Above All</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When a QR code is printed on 50,000 physical product boxes, it cannot fail. Our edge infrastructure 
              features automated failover, database replication, and sub-second cold starts.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">User Privacy First</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never track individuals across the web. We record high-level aggregate scan statistics (device category, 
              browser, city) and automatically mask IP addresses to protect consumer privacy.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Design & Craftsmanship</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              QR codes should look gorgeous. Our studio supports custom dots, rounded corner frames, independent inner 
              pupil accents, logo embedding with quiet-zone detection, and print standee generators.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable Open Model Callout */}
      <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            How does QRLoop sustain free dynamic QR codes?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            By running lightweight serverless edge redirects, partnering with non-intrusive privacy-conscious advertisers 
            (such as Google AdSense), and building lean cloud architectures, our operating costs remain low enough to keep 
            the service 100% free for everyone.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToContact}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800 hover:bg-slate-50 dark:hover:bg-dark-750 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all"
          >
            Contact Team
          </button>
          <button
            onClick={onNavigateToDynamic}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-dark-950 font-bold text-xs shadow-glow-emerald hover:brightness-105 transition-all flex items-center gap-1.5"
          >
            <span>Create Free QR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
