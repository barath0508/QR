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
  Copy
} from 'lucide-react';

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

      {/* 7. Deep-Dive Educational Guide & Feature Comparison Table (1200+ Words for AdSense & SEO Depth) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed">
        
        {/* Topic 1: What is Dynamic QR */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
              In-Depth Guide
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            What is a Dynamic QR Code and How Does It Work?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A <strong>dynamic QR code</strong> is a modern two-dimensional barcode that routes scanners through an intermediate high-speed edge server before reaching the ultimate destination web address. Unlike a static QR code—where the complete destination URL is hardcoded into the black-and-white matrix dots forever—a dynamic QR code stores a compact, shortened redirect identifier (such as <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-emerald-800 dark:text-emerald-300 font-mono text-xs">/r/abc123</code>).
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            This redirection architecture offers three transformative advantages for businesses, designers, and creators:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li><strong>Editable Destination URLs:</strong> If you print 5,000 restaurant menus, trade show flyers, or product packaging boxes and your website link changes, you do not need to re-print your marketing collateral. You simply update the target URL in your QRLoop dashboard, and all existing physical QR codes instantly redirect to the new page.</li>
            <li><strong>Granular Scan Analytics & Telemetry:</strong> Because scans pass through our sub-50ms redirection engine, you gain real-time visibility into your audience. You can analyze scan volume by date, mobile vs. desktop devices, operating systems (iOS, Android, Windows, macOS), browser types, and approximate geographic cities—all while strictly respecting privacy and anonymizing user IP addresses.</li>
            <li><strong>Cleaner, Higher-Density Scanning Matrix:</strong> Long URLs packed with UTM campaign parameters and tracking tokens result in dense, clustered QR pixel grids that older smartphone cameras struggle to read. A dynamic QR code keeps the encoded data string short and clean, allowing the QR code to be scanned from greater distances and in low-light environments.</li>
          </ul>
        </div>

        {/* Topic 2: Why Free Forever */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Why QRLoop is 100% Free: Ending the 14-Day Paywall Trap
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            The QR code software market has long been troubled by predatory billing practices. Many commercial QR generators allow unsuspecting users to create "free" dynamic QR codes. Weeks later, after the business has spent hundreds or thousands of dollars printing brochures, banners, product packaging, and acrylic desk standees, the provider disables the redirect and demands an ongoing subscription of $35 to $60 per month to keep the links functioning.
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            At <strong>QRLoop</strong>, we believe basic edge URL redirection is a foundational utility that should never be held hostage. HTTP 302 redirects require minimal computation. By engineering a lean, serverless cloud architecture and supporting our operations through non-intrusive, privacy-compliant Google AdSense advertising, QRLoop provides <strong>lifetime active dynamic QR redirects</strong> with zero scan paywalls and zero trial expirations.
          </p>
        </div>

        {/* Topic 3: Comparison Matrix Table */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Dynamic QR Codes vs. Static QR Codes: Key Differences
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-white/10 my-4">
              <thead>
                <tr className="bg-slate-100 dark:bg-dark-800 text-slate-900 dark:text-white">
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold">Feature</th>
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold text-emerald-800 dark:text-emerald-300">Dynamic QR (QRLoop)</th>
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold">Static QR</th>
                  <th className="p-3 border border-slate-200 dark:border-white/10 font-bold">Traditional Paid Services</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Editable After Printing</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Yes (Instant Update)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-red-700 dark:text-red-400 font-bold">No (Permanent Matrix)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Yes (Requires $35/mo)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Real-Time Scan Analytics</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Yes (Included Free)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-red-700 dark:text-red-400 font-bold">No Telemetry</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Paywalled behind tiers</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Expiration & Paywall</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Never Expires (Lifetime)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Never Expires</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-red-700 dark:text-red-400 font-bold">Deactivated after 14 days</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Monthly Subscription</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">$0 Forever Free</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">$0 Free</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-red-700 dark:text-red-400 font-bold">$30 - $60 / month</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-white/10 font-semibold">Vector SVG & Print PDF</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10 text-emerald-800 dark:text-emerald-300 font-bold">Yes (Lossless)</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Yes</td>
                  <td className="p-3 border border-slate-200 dark:border-white/10">Often locked to Pro tier</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Topic 4: Step-by-Step Creation Guide */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Step-by-Step Guide: How to Create a Custom Dynamic QR Code
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li>
              <strong>Choose Your QR Type:</strong> Select <a href="/dynamic-qr" onClick={handleLinkClick(onNavigateToDynamic)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">Dynamic QR</a> for trackable marketing campaigns and editable website links, or choose <a href="/static-qr" onClick={handleLinkClick(onNavigateToStatic)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">Static QR</a> for offline Wi-Fi credentials, plain text, and vCards.
            </li>
            <li>
              <strong>Enter Your Destination Address:</strong> Provide the target website URL (e.g., your online menu, booking page, mobile app download, or social media hub).
            </li>
            <li>
              <strong>Customize Visual Design & Branding:</strong> In the QRLoop Studio, select custom module dot shapes (smooth rounded dots, sleek pills, or classic squares), customize the corner eye frames and inner pupils, select gradient or brand colors, and upload your company logo with automatic quiet-zone protection.
            </li>
            <li>
              <strong>Download Print-Ready Assets:</strong> Export your styled QR code in lossless vector SVG format (for billboards and high-resolution commercial printing), high-DPI raster PNG (for web and social graphics), or print-ready A4 PDF with crop guidelines.
            </li>
            <li>
              <strong>Monitor Performance & Edit Anytime:</strong> Access your <a href="/dashboard" onClick={handleLinkClick(onNavigateToDashboard)} className="text-emerald-800 dark:text-emerald-300 underline font-semibold">QR Management Portal</a> to view scan counts, scanner devices, and visitor regions, or update the target URL whenever needed.
            </li>
          </ol>
        </div>

        {/* Topic 5: Practical Use Cases */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Industry Solutions & Practical Use Cases
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
            Dynamic QR codes empower businesses across countless physical touchpoints:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Restaurant Digital Menus</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">Update daily specials, seasonal prices, and item availability instantly without re-printing table tents or acrylic flyers.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Conferences & Event Badges</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">Seamlessly route attendees to dynamic event schedules, speaker bios, live polling, and networking check-ins.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Instant Guest Wi-Fi Access</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">Enable hotel guests and café patrons to connect to secure WPA2/WPA3 Wi-Fi networks with one scan—no typing complex passwords.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Digital Business Cards (vCard)</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">Direct clients to your digital portfolio, contact info, and calendar booking link with clean, high-DPI vector printing.</p>
            </div>
          </div>
        </div>

        {/* Topic 6: Printing Best Practices */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Printing Best Practices: The 10:1 Distance-to-Size Ratio
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            To ensure optimal camera readability on physical packaging, signage, and merchandise, follow professional printing standards:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li><strong>The 10:1 Scanning Ratio:</strong> As a rule of thumb, the distance between the camera and the QR code should be approximately 10 times the width of the QR code. For example, a business card scanned from 10 inches away requires a minimum size of 1 inch (2.5 cm). A billboard scanned from 30 feet away requires a QR code at least 3 feet wide.</li>
            <li><strong>High Contrast & Dark Modules:</strong> Always ensure strong color contrast between the QR code modules and the background. Dark foreground dots on a light background scan fastest across all smartphone operating systems. Avoid inverted white-on-yellow or low-contrast pastels.</li>
            <li><strong>Preserve the Quiet Zone:</strong> Every QR code requires a margin of blank space (the quiet zone) around all four sides equivalent to at least 4 module widths. Avoid placing text, graphics, or borders too close to the finder eyes.</li>
            <li><strong>Always Use Vector SVG for Large Format:</strong> When printing flyers, packaging, or exhibition displays, never stretch a low-resolution bitmap PNG. Download QRLoop's vector SVG file, which scales infinitely to any dimension with zero pixelation or blurriness.</li>
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
