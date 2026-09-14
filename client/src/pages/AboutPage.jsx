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
  Coffee,
  Lock,
  Printer
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function AboutPage({ onBackToHome, onNavigateToDynamic, onNavigateToContact, onNavigateToBlog }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-slate-800 dark:text-slate-200">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <Breadcrumb
          items={[{ label: 'Our Story & Philosophy' }]}
          onNavigateHome={onBackToHome}
        />
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase hidden sm:inline-block">
          The QRLoop Story
        </span>
      </div>

      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/30" />
          <span>Built by Independent Developers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          A 14-day trial code almost ruined our friend's wedding. That's why we built QRLoop.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Dynamic QR codes are just lightweight website redirects. Charging small business owners and creators $40 a month to point a code to a website is an industry scam—and we decided to put an end to it.
        </p>
      </div>

      {/* The Origin Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            How It All Began
          </h2>
          <p>
            In the summer of 2023, our close friend Alex ordered 350 custom letterpress wedding invitations. At the bottom was an elegant QR code designed using a popular "free" online generator, intended to take guests directly to the digital RSVP and registry page.
          </p>
          <p>
            Exactly two weeks later—while responses were still rolling in—guests started texting screenshots of a glaring red warning screen: <em className="text-rose-600 dark:text-rose-400 font-medium">"This free trial has expired. The account owner must upgrade to Pro for $39/month to reactivate this code."</em>
          </p>
          <p>
            Alex was completely mortified. The wedding was three months away, the invitations were already mailed across three continents, and reprinting was out of the question. They were forced to enter their credit card and pay an ongoing monthly fee just to keep their invitations working.
          </p>
          <p>
            When we looked at what was happening under the hood, we were furious. In computing, an HTTP 302 redirect takes less than two milliseconds of CPU time on an edge server. Holding someone's physical paper invitations or restaurant menu standees hostage for $450 a year isn't a software service—it's extortion.
          </p>
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">
            That weekend, we started writing the code for QRLoop. Our goal was simple: build a rock-solid, permanent, beautiful dynamic QR generator that will never, ever expire.
          </p>
        </div>

        {/* Feature Visual Bento */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Zap className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sub-50ms Edge Hops</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your scanners are redirected almost instantaneously, no matter where on Earth they scan from.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Lock className="w-6 h-6 text-cyan-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Lifetime Persistence</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Zero trial timers. Once you create a dynamic shortcode, it remains permanently active.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Printer className="w-6 h-6 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Real Vector SVG</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Infinitely sharp math curves that commercial printers love. No blurry or stretched pixels.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2">
            <Coffee className="w-6 h-6 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Tracking Cookies</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">We count scans by device and country. We never store IP addresses or follow people around the web.</p>
          </div>
        </div>
      </div>

      {/* Sustainable Open Model Callout */}
      <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-emerald-500/5 via-white dark:via-dark-900 to-teal-500/5 space-y-4">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
          "How is this free? What's the catch?"
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          It's a fair question. On the modern web, people have learned that when something claims to be free, they are usually the product. Here is our completely open, transparent business model:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Serverless Edge Routing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              By using modern cloud database architecture (Supabase & distributed edge caching), executing a million redirects costs us mere pocket change per month.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Ethical Display Advertising</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Clean, non-intrusive Google AdSense banners on our studio pages generate more than enough revenue to cover our server hosting bills with money to spare.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">3. Zero Corporate Bloat</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We have no venture capital investors demanding quarterly profit doubling, no enterprise sales reps on commission, and no glossy marketing agencies. Just clean, honest engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
          Our Four Guarantees to Every Creator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Print Permanence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you print a QR code on 10,000 product boxes, business cards, or storefront glass, that ink is permanent. Our redirects match that physical permanence: they will never expire or demand money to stay alive.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">True Privacy for Scanners</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scanning a menu at a pub should not expose you to ad trackers. We calculate high-level telemetry (e.g. iPhone vs Android, approximate city) without ever recording individual identifying data or selling information to third-party brokers.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Resolution Penalties</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Other tools restrict free users to blurry 300px JPEGs and charge $15 for vector files. We give you lossless SVG and 300 DPI print-ready PDFs for free because beautiful typography and design should never be paywalled.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Transparent Architecture</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our system runs on open-source web standards: Node.js, Express, and PostgreSQL via Supabase with SQLite fallback. You are never locked into a proprietary black-box system.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
            Ready to create a code you can trust?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Design your dynamic QR in 30 seconds. No credit card required, now or ever.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToContact}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-800 hover:bg-slate-50 dark:hover:bg-dark-750 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-150 cursor-pointer"
          >
            Say Hello
          </button>
          <button
            onClick={onNavigateToDynamic}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-dark-950 font-bold text-xs shadow-glow-emerald hover:brightness-105 transition-transform duration-150 will-change-transform flex items-center gap-1.5 cursor-pointer"
          >
            <span>Create Free Dynamic QR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
