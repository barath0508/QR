import React from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Wifi,
  BookOpen, 
  Check, 
  ExternalLink,
  Lock,
  Layers
} from 'lucide-react';

export default function LandingPage({ 
  onNavigateToDynamic, 
  onNavigateToStatic, 
  onNavigateToBlog, 
  onNavigateToCompare, 
  onNavigateToDashboard 
}) {
  return (
    <div className="space-y-24 pb-20 pt-8 sm:pt-14">

      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span>The Open Dynamic QR Platform • 100% Free Forever</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.12]">
          Free Dynamic QR Code Generator for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
            Editable, Trackable Links.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Create custom QR codes for websites, menus, flyers, packaging, events and marketing campaigns. Edit destination URLs after printing, measure QR scans, and download print-ready PNG, SVG or PDF files.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onNavigateToDynamic}
            className="w-full sm:w-auto h-12 px-7 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-white text-white" />
            <span>Create Dynamic QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onNavigateToStatic}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white dark:bg-dark-900 hover:bg-slate-50 dark:hover:bg-dark-850 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <QrCode className="w-4 h-4 text-cyan-500" />
            <span>Quick Static Generator</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-8 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Sub-50ms Fast 302 Redirects</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Vector SVG & Print-Ready PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>No 14-Day Expiration Trap</span>
          </div>
        </div>
      </section>

      {/* 2. Dynamic vs Static Visual Comparison Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Choose the Right QR Code for Your Needs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
            Whether you need permanent offline encoding or trackable redirect links, QRLoop has you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Dynamic Card */}
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/20 dark:from-emerald-950/20 dark:via-dark-900 dark:to-dark-950 p-7 sm:p-9 backdrop-blur-xl shadow-md dark:shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-5 right-5">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500 text-dark-950 font-mono shadow-xs">
                RECOMMENDED
              </span>
            </div>

            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Dynamic QR Codes</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  The destination URL can be changed anytime from your dashboard without re-printing.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Change destination anytime:</strong> Fix typos or swap marketing campaigns without changing printed material.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Live scan telemetry:</strong> Track total scans, device types, operating systems, and top geographic locations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Clean scannable matrix:</strong> Uses short redirect URLs to keep QR dots large and instantly camera-readable.</span>
                </li>
              </ul>
            </div>

            <div className="pt-7 mt-7 border-t border-slate-200/80 dark:border-white/10">
              <button
                onClick={onNavigateToDynamic}
                className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Launch Dynamic Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Static Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 p-7 sm:p-9 backdrop-blur-xl shadow-sm dark:shadow-none flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Wifi className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Static QR Codes</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Data is permanently burned directly into the black and white pixel pattern.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span><strong>100% offline & permanent:</strong> Works forever with no servers or internet routing required.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero login required:</strong> Generate and download instant PNG, SVG, or print-ready PDF in seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Ideal for Wi-Fi & vCards:</strong> Embed fixed passwords, contact cards, or direct text payloads.</span>
                </li>
              </ul>
            </div>

            <div className="pt-7 mt-7 border-t border-slate-200/80 dark:border-white/10">
              <button
                onClick={onNavigateToStatic}
                className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-750 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-200/80 dark:border-white/5 transition-all"
              >
                <span>Launch Static Generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-emerald-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Sub-50ms Fast Redirects</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Asynchronous scan logging redirects visitors immediately with HTTP 302 without delay or intermediate splash screens.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-cyan-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Print-Ready PDF & SVG</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Export lossless vector SVG for commercial printing or auto-generate centered A4 printable table standees with one click.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-purple-500/40 transition-all shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Real-Time Scan Telemetry</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitor scan spikes, device breakdown, operating systems, and top geographic locations without setting up heavy analytics scripts.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Blog & Educational Guides Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                Knowledge Hub
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1.5">
              Latest Guides & Tutorials
            </h2>
          </div>

          <button
            onClick={onNavigateToBlog}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={onNavigateToBlog}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs dark:shadow-none space-y-2.5 group"
          >
            <span className="text-[11px] uppercase font-bold text-red-600 dark:text-red-400 font-mono">Industry Warning</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              The 14-Day QR Paywall Trap: How Paid Services Hold Your Links Hostage
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              Learn how commercial generators bait users into printing brochures before locking links behind monthly subscriptions.
            </p>
          </div>

          <div
            onClick={onNavigateToBlog}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs dark:shadow-none space-y-2.5 group"
          >
            <span className="text-[11px] uppercase font-bold text-emerald-600 dark:text-emerald-400 font-mono">Best Practices</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              Dynamic vs Static QR Codes: The Complete Business Guide
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              A comprehensive checklist to choose between static and dynamic codes for product packaging and marketing.
            </p>
          </div>

          <div
            onClick={onNavigateToBlog}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs dark:shadow-none space-y-2.5 group"
          >
            <span className="text-[11px] uppercase font-bold text-cyan-600 dark:text-cyan-400 font-mono">Print & Design</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              Professional QR Print Specifications: The 10:1 Scanning Rule
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              Essential guidelines on resolution, quiet zone margins, and contrast ratios for crisp camera scanning.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Competitor Comparison Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-xl transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                100% Free • No Subscription
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              Why pay $35/month for dynamic QR codes?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              See how QRLoop compares against QRCode Monkey, Bitly, and Uniqode. Lifetime redirects with zero scan limits.
            </p>
          </div>

          <button
            onClick={onNavigateToCompare}
            className="h-11 px-6 rounded-xl bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2 border border-slate-900 dark:border-white/10 transition-all flex-shrink-0 shadow-sm"
          >
            <span>Compare vs Paid Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. Comprehensive SEO FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know About Dynamic & Static QR Codes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Clear answers about QR customization, vector image exports, analytics, and lifetime active links.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              What is the best free dynamic QR code generator?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>QRLoop</strong> is designed to be the best free dynamic QR code generator because unlike commercial alternatives, it never locks your codes after a 14-day trial. You get editable destination URLs, real-time scan analytics, custom logo embedding, and lossless vector exports completely free.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              How do dynamic QR codes work for a website?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A dynamic QR code encodes a short, high-speed redirect link (e.g. <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-emerald-600 dark:text-emerald-400 font-mono text-xs">/r/:shortcode</code>) rather than a long URL. When scanned, our global edge redirects the user to your destination website in under 50ms while logging scan telemetry (device, operating system, timestamp, and location). You can update the destination URL at any time from your dashboard without changing your printed QR codes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              What QR customization options are available?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              QRLoop gives you total design control: choose dot module shapes (dots, rounded squares, class blocks), corner eye designs (square, rounded, circle), custom color gradients, background transparency, and center brand logos or social icons with automatic quiet-zone masking.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              How do I export a QR code to high-resolution image formats?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              You can download your customized QR code in multiple formats: <strong>PNG</strong> for digital use and social media, <strong>lossless vector SVG</strong> for scalable commercial billboards and packaging, and <strong>print-ready A4 PDF</strong> with centered cut-out guidelines for restaurant table standees and desk signage.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Do QRLoop dynamic QR codes ever expire?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No! QRLoop dynamic QR codes have <strong>lifetime active redirects</strong>. There are zero scan limits, no monthly renewal fees, and no 14-day expiration traps. You can print them on physical marketing collateral with complete confidence.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
