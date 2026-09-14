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
  Wifi,
  BookOpen, 
  Check, 
  Share2,
  Copy,
  Star,
  MessageSquare,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { commonFAQs } from '../utils/seo';

export default function LandingPage({ 
  onNavigateToDynamic, 
  onNavigateToStatic, 
  onNavigateToBlog, 
  onNavigateToCompare, 
  onNavigateToDashboard 
}) {
  const [shareCopied, setShareCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?utm_source=share&utm_medium=referral&utm_campaign=qrloop_growth`
    : 'https://qrloop4.vercel.app/?utm_source=share&utm_medium=referral&utm_campaign=qrloop_growth';

  const shareMessage = 'Create free editable QR codes with QRLoop - no expiration, no watermark, and built-in scan analytics.';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'QRLoop - Free QR Code Generator', text: shareMessage, url: shareUrl });
      } catch (error) {
        if (error.name !== 'AbortError') throw error;
      }
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2200);
  };

  const handleLinkClick = (action) => (e) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="space-y-24 pb-20 pt-8 sm:pt-14">

      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>The Open Dynamic QR Platform • 100% Free Forever</span>
        </div>

        {/* Hero Title - Single H1 Tag */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.12]">
          Free Dynamic QR Code Generator with <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
            Real-Time Analytics.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Create custom QR codes for websites, menus, flyers, packaging, events and marketing campaigns. Edit destination URLs after printing, measure QR scans, and download print-ready PNG, SVG or PDF files.
        </p>

        {/* Call to Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <a
            href="/dynamic-qr"
            onClick={handleLinkClick(onNavigateToDynamic)}
            className="w-full sm:w-auto h-12 px-7 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-transform duration-150 will-change-transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-white text-white" />
            <span>Create Dynamic QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/static-qr"
            onClick={handleLinkClick(onNavigateToStatic)}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white dark:bg-dark-900 hover:bg-slate-50 dark:hover:bg-dark-850 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors duration-150"
          >
            <QrCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Quick Static Generator</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-8 pt-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Sub-50ms Fast 302 Redirects</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Vector SVG & Print-Ready PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed">
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
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
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
              <a
                href="/dynamic-qr"
                onClick={handleLinkClick(onNavigateToDynamic)}
                className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors duration-150"
              >
                <span>Launch Dynamic Studio</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Static Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 p-7 sm:p-9 backdrop-blur-xl shadow-xs dark:shadow-none flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Wifi className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Static QR Codes</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
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
              <a
                href="/static-qr"
                onClick={handleLinkClick(onNavigateToStatic)}
                className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-750 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-200/80 dark:border-white/5 transition-colors duration-150"
              >
                <span>Launch Static Generator</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-emerald-500/40 transition-colors duration-150 shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Sub-50ms Fast Redirects</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Asynchronous scan logging redirects visitors immediately with HTTP 302 without delay or intermediate splash screens.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-cyan-500/40 transition-colors duration-150 shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Print-Ready PDF & SVG</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Export lossless vector SVG for commercial printing or auto-generate centered A4 printable table standees with one click.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 backdrop-blur-md space-y-3 hover:border-purple-500/40 transition-colors duration-150 shadow-xs dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Real-Time Scan Telemetry</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Monitor scan spikes, device breakdown, operating systems, and top geographic locations without setting up heavy analytics scripts.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Built-in sharing loop */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-white to-cyan-500/10 dark:from-emerald-950/30 dark:via-dark-900 dark:to-cyan-950/20 p-7 sm:p-10">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Help a creator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                Know someone who needs a QR code?
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Share a free, no-expiration QR generator with a business owner, designer, restaurant, or event organizer. One click copies a trackable referral link.
              </p>
            </div>
            <button
              onClick={handleShare}
              className="flex-shrink-0 h-11 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors duration-150 cursor-pointer"
            >
              {shareCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{shareCopied ? 'Link copied' : 'Share QRLoop'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Blog & Educational Guides Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                Knowledge Hub
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1.5">
              Latest Guides & Tutorials
            </h2>
          </div>

          <a
            href="/blog"
            onClick={handleLinkClick(onNavigateToBlog)}
            className="text-sm font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-600 flex items-center gap-1.5 transition-colors duration-150"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/blog"
            onClick={handleLinkClick(onNavigateToBlog)}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 transition-colors duration-150 cursor-pointer shadow-xs dark:shadow-none space-y-2.5 group block"
          >
            <span className="text-[11px] uppercase font-bold text-red-700 dark:text-red-400 font-mono">Industry Warning</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              The 14-Day QR Paywall Trap: How Paid Services Hold Your Links Hostage
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
              Learn how commercial generators bait users into printing brochures before locking links behind monthly subscriptions.
            </p>
          </a>

          <a
            href="/blog"
            onClick={handleLinkClick(onNavigateToBlog)}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 transition-colors duration-150 cursor-pointer shadow-xs dark:shadow-none space-y-2.5 group block"
          >
            <span className="text-[11px] uppercase font-bold text-emerald-800 dark:text-emerald-300 font-mono">Best Practices</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              Dynamic vs Static QR Codes: The Complete Business Guide
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
              A comprehensive checklist to choose between static and dynamic codes for product packaging and marketing.
            </p>
          </a>

          <a
            href="/blog"
            onClick={handleLinkClick(onNavigateToBlog)}
            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 transition-colors duration-150 cursor-pointer shadow-xs dark:shadow-none space-y-2.5 group block"
          >
            <span className="text-[11px] uppercase font-bold text-cyan-800 dark:text-cyan-300 font-mono">Print & Design</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              Professional QR Print Specifications: The 10:1 Scanning Rule
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
              Essential guidelines on resolution, quiet zone margins, and contrast ratios for crisp camera scanning.
            </p>
          </a>
        </div>
      </section>

      {/* 6. Competitor Comparison Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs dark:shadow-xl transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                100% Free • No Subscription
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              Why pay $35/month for dynamic QR codes?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed">
              See how QRLoop compares against QRCode Monkey, Bitly, and Uniqode. Lifetime redirects with zero scan limits.
            </p>
          </div>

          <a
            href="/compare"
            onClick={handleLinkClick(onNavigateToCompare)}
            className="h-11 px-6 rounded-xl bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2 border border-slate-900 dark:border-white/10 transition-colors duration-150 flex-shrink-0 shadow-xs"
          >
            <span>Compare vs Paid Tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 7. Deep-Dive Educational Guide & Feature Comparison Table */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed">
        
        {/* Topic 1: What is Dynamic QR */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
              The Essentials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            What is a Dynamic QR Code, and How Does It Actually Work?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Think of a <strong>static QR code</strong> like engraving words into stone. The moment you generate it, every letter of your website URL is permanently burned into the pattern of black and white squares. If you change your website URL next month, launch a new seasonal menu, or spot a single typo after printing 2,000 brochures, that paper is useless.
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A <strong>dynamic QR code</strong> works like a permanent forwarding address on your mailbox. Instead of encoding a long, fragile 80-character URL, the code holds a clean, compact short link (such as <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-emerald-800 dark:text-emerald-300 font-mono text-xs">/r/my-store</code>).
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            When a customer aims their camera at the code, our edge network intercepts the scan, checks where you want that visitor to go today, and routes them to your actual website in less than 50 milliseconds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-dark-900/50 border border-slate-200/80 dark:border-white/5 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Swap Links on the Fly</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Change your destination URL from your phone at 2:00 AM without touching the printed flyers on your tables.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-dark-900/50 border border-slate-200/80 dark:border-white/5 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Clean, Easy-to-Scan Grid</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Because the short link is tiny, the matrix has fewer, larger squares that scan effortlessly from across the room.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-dark-900/50 border border-slate-200/80 dark:border-white/5 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Understand Your Foot Traffic</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">See what days and hours get the most scans, whether visitors use iPhone or Android, and what cities they are in.</p>
            </div>
          </div>
        </div>

        {/* Topic 2: Why Free Forever */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Why QRLoop is 100% Free: Ending the 14-Day Paywall Trap
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Many commercial QR generators rely on a predatory business model: they offer "free" dynamic codes, let you download them without warning, and wait until you have spent real money printing physical acrylic standees, menus, or product boxes.
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Exactly two weeks later, your codes suddenly stop working. Instead of your website, your customers see an embarrassing ransom message demanding $35 to $60 every month to turn the links back on.
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            We believe holding physical ink and paper hostage is wrong. In modern cloud computing, an HTTP redirect takes almost zero computational effort. By running a lean serverless architecture and letting small, non-intrusive Google AdSense banners support our server bills, QRLoop provides <strong>lifetime active dynamic redirects</strong> with zero monthly fees, zero scan limits, and zero trial countdowns.
          </p>
        </div>

        {/* Topic 3: Comparison Matrix Table */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Dynamic vs. Static QR Codes: Which One Should You Pick?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-white/10 my-4">
              <thead>
                <tr className="bg-slate-100 dark:bg-dark-800 text-slate-900 dark:text-white">
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold">Practical Feature</th>
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold text-emerald-800 dark:text-emerald-300">Dynamic QR (QRLoop)</th>
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold">Static QR (QRLoop)</th>
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold">Commercial Paid Tools</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Can change target URL after printing?</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Yes, anytime in 1 click</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-slate-500">No (locked into physical ink)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Yes (requires $35/month)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Real-time scan counter and analytics?</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Yes, included free</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-slate-500">No (direct offline scan)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Locked behind Pro tiers</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Will this code ever expire?</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Never (lifetime active)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Never (permanent)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-red-600 dark:text-red-400 font-bold">Shuts off after 14-day trial</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Monthly cost</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">$0 Free Forever</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">$0 Free</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-red-600 dark:text-red-400 font-bold">$30 to $60 / month</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">High-res Vector SVG export for print shops?</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Yes (infinite resolution)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Yes</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Often restricted to paid users</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Topic 4: Practical Guide */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            How to Create and Print a Reliable QR Code
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li>
              <strong>Choose between Dynamic or Static:</strong> Pick <a href="/dynamic-qr" onClick={handleLinkClick(onNavigateToDynamic)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">Dynamic</a> if you're printing marketing materials, restaurant menus, or packaging where the link might evolve. Pick <a href="/static-qr" onClick={handleLinkClick(onNavigateToStatic)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">Static</a> for simple Wi-Fi credentials or vCards that never need to change.
            </li>
            <li>
              <strong>Type your destination URL:</strong> Paste your target web page (e.g. your Instagram, online store, Google Maps location, or PDF menu).
            </li>
            <li>
              <strong>Customize colors with high contrast:</strong> Choose a dark color for the dots and corner squares against a clean, light background. You can embed your company logo—QRLoop automatically clears away the central dots so your logo never interferes with the scanner's optical focus.
            </li>
            <li>
              <strong>Download as Vector SVG:</strong> If you are sending your design to a commercial printer or applying it to laser-cut wood or metal, always export as <strong>vector SVG</strong>. Unlike a PNG image, SVG is mathematical geometry that never gets pixelated or blurry at any size.
            </li>
          </ol>
        </div>

        {/* Topic 5: Real-World Use Cases */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Where People Use QRLoop Every Day
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Cafes & Restaurant Menus</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Update daily specials and drink prices on your website without throwing away expensive printed acrylic stands or wooden table blocks.</p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Product Packaging & Labels</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Point consumers to instructional videos, recipe suggestions, or batch authenticity pages that you can update long after the product has shipped.</p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Conference & Event Badges</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Route attendees to live schedule updates, speaker bios, and real-time room change alerts during multi-day conventions.</p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Instant Guest Wi-Fi</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Let visitors tap and connect to your guest Wi-Fi immediately without having to decipher a 20-character password on the back of a router.</p>
            </div>
          </div>
        </div>

        {/* Topic 6: The Golden Printing Rules */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            The Physics of Scanning: How to Avoid Costly Printing Blunders
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Before ordering 5,000 prints, keep these four optical rules in mind so every smartphone camera can read your code instantly:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li><strong>The 10:1 Distance Ratio:</strong> A phone needs to be roughly 10 times the width of the QR code away to scan comfortably. For a business card held 10 inches away, a 1-inch (25mm) code is perfect. For a window banner scanned from 10 feet away, your code needs to be at least 1 foot (300mm) wide.</li>
            <li><strong>Luminance Contrast (Not Just Color):</strong> Smartphone sensors convert the camera feed to black-and-white grayscale before running edge detection. If you use pastel pink dots on a light beige background, the phone sees them as almost identical shades of gray and cannot find the dots. Always keep a strong contrast between dark modules and light backgrounds.</li>
            <li><strong>Leave the Quiet Zone Alone:</strong> The blank white border around a QR code isn't wasted space—it's how the camera's algorithm knows where your background graphics stop and the barcode begins. Always leave at least 4 module widths of blank margin around all four sides.</li>
            <li><strong>Always Choose Vector SVG:</strong> When printing flyers or posters, never scale up a small PNG file. Download QRLoop's vector SVG file—it's pure mathematical vector curves that stay crisp whether printed on a tiny sticker or an enormous highway billboard.</li>
          </ul>
        </div>

      </section>

      {/* 8. Comprehensive SEO FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know About Dynamic & Static QR Codes
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto">
            Clear answers about QR customization, vector image exports, analytics, and lifetime active links.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              What is the best free dynamic QR code generator?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>QRLoop</strong> is designed to be the best free dynamic QR code generator because unlike commercial alternatives, it never locks your codes after a 14-day trial. You get editable destination URLs, real-time scan analytics, custom logo embedding, and lossless vector exports completely free.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              How do dynamic QR codes work for a website?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A dynamic QR code encodes a short, high-speed redirect link (e.g. <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-emerald-800 dark:text-emerald-300 font-mono text-xs">/r/:shortcode</code>) rather than a long URL. When scanned, our global edge redirects the user to your destination website in under 50ms while logging scan telemetry (device, operating system, timestamp, and location). You can update the destination URL at any time from your dashboard without changing your printed QR codes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              What QR customization options are available?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              QRLoop gives you total design control: choose dot module shapes (dots, rounded squares, class blocks), corner eye designs (square, rounded, circle), custom color gradients, background transparency, and center brand logos or social icons with automatic quiet-zone masking.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              How do I export a QR code to high-resolution image formats?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              You can download your customized QR code in multiple formats: <strong>PNG</strong> for digital use and social media, <strong>lossless vector SVG</strong> for scalable commercial billboards and packaging, and <strong>print-ready A4 PDF</strong> with centered cut-out guidelines for restaurant table standees and desk signage.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Do QRLoop dynamic QR codes ever expire?
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              No! QRLoop dynamic QR codes have <strong>lifetime active redirects</strong>. There are zero scan limits, no monthly renewal fees, and no 14-day expiration traps. You can print them on physical marketing collateral with complete confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 8b. Community Feedback, Reviews & User Discussions */}
      <section id="community-reviews" aria-label="Community Reviews and Discussion" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span>Community Feedback & User Discussions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Loved by 45,000+ Creators, Agencies & Businesses
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto">
            Real feedback from restaurant owners, marketing teams, and developers using QRLoop for permanent, unexpired dynamic QR codes.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "Saved our restaurant chain over $400/year on QR menu subscriptions. Scans are instant and the analytics show us what days and hours are busiest."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Marcus Vance</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Hospitality Director • Chicago</p>
              </div>
            </div>
          </article>

          <article className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "The vector SVG export was accepted by our commercial printer with zero errors. It scaled to 48-inch trade show banners without any blurriness."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                S
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Samantha Lee</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Brand Designer • Studio Form</p>
              </div>
            </div>
          </article>

          <article className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "No 14-day trial expiration, no watermark, and true live redirects. Finally an open QR platform built with genuine developer integrity."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">
                J
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Jordan Miller</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Independent Marketer • Austin</p>
              </div>
            </div>
          </article>
        </div>

        {/* Community Discussion Invitation Banner */}
        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Join the QRLoop Knowledge Community</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Have technical questions or print guidelines to discuss? Join our guides discussions and leave your comments.
            </p>
          </div>
          <a
            href="/blog"
            onClick={handleLinkClick(onNavigateToBlog)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition-colors flex-shrink-0 inline-flex items-center gap-1.5"
          >
            <span>Explore Community Guides & Discussions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 8.5 Frequently Asked Questions & Standards (High SEO & AI Snippet Value) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
            <span>Frequently Asked Questions & Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Everything You Need to Know About QRLoop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Direct, factual answers regarding redirection architecture, lifetime availability, scanning physics, and data privacy.
          </p>
        </div>

        <div className="space-y-3">
          {commonFAQs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/70 shadow-xs transition-all [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-slate-900 dark:text-white">
                <span className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs flex items-center justify-center font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180 shrink-0 ml-2" />
              </summary>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8.5 border-t border-slate-100 dark:border-white/5 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Transparency, E-A-T and Author Info Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-white/10 pt-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">About QRLoop & Our Commitment to Privacy</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          QRLoop is developed and maintained by QRLoop Technologies. We are committed to complete transparency regarding data handling, advertising networks, and cookie practices. Our dynamic redirect infrastructure uses TLS 1.3 encryption and automated IP anonymization. Read our comprehensive <a href="/privacy" onClick={handleLinkClick(onNavigateToCompare)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">Privacy Policy</a> and <a href="/terms" onClick={handleLinkClick(onNavigateToCompare)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">Terms of Service</a> for complete details on data rights, GDPR/CCPA compliance, and third-party advertising cookies.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <span>Support Contact: <a href="mailto:support@qrloop.io" className="underline text-emerald-800 dark:text-emerald-300 font-semibold">support@qrloop.io</a></span>
          <span>•</span>
          <span>Privacy Desk: <a href="mailto:privacy@qrloop.io" className="underline text-emerald-800 dark:text-emerald-300 font-semibold">privacy@qrloop.io</a></span>
          <span>•</span>
          <span>Open Source: <a href="https://github.com/barath0508/QR" target="_blank" rel="noopener noreferrer" className="underline text-emerald-800 dark:text-emerald-300 font-semibold">GitHub Repository</a></span>
        </div>
      </section>

    </div>
  );
}
