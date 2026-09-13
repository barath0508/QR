import React from 'react';
import { Cookie, ArrowLeft, Shield, ExternalLink, Settings2, CheckCircle2 } from 'lucide-react';

export default function CookiePolicyPage({ onBackToHome, onNavigateToPrivacy, onNavigateToContact }) {
  const lastUpdated = 'September 13, 2026';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in text-slate-800 dark:text-slate-200">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Last Revised: {lastUpdated}
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <Cookie className="w-3.5 h-3.5 text-amber-500" />
          <span>Cookie Disclosure & Consent Management</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          This policy explains what cookies and tracking technologies are, how QRLoop and third-party advertising 
          partners (including Google AdSense) utilize them, and how you can manage your preferences.
        </p>
      </div>

      {/* Cookie Table / Categories */}
      <div className="space-y-6">
        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
          Categories of Cookies We Use
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">1. Strictly Necessary</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Essential for the operation of the website. Includes saving your theme preference (dark/light), 
              authenticating login sessions, and remembering your cookie consent selections.
            </p>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-slate-500">
              Cannot be disabled
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Settings2 className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">2. Performance & Analytics</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Helps us understand how visitors navigate QRLoop, identify broken links, and measure page load speed 
              using Google Analytics and Microsoft Clarity. All metrics are aggregated and pseudonymized.
            </p>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-slate-500">
              Optional / User Configurable
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Shield className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">3. Advertising & Marketing</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Set by third-party advertising partners such as Google AdSense. Used to serve relevant advertisements, 
              prevent the same ad from repeatedly appearing, and measure advertising campaign effectiveness.
            </p>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-800 text-slate-500">
              Optional / Opt-Out Supported
            </span>
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 text-slate-700 dark:text-slate-300">
        
        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            What Are Cookies?
          </h2>
          <p>
            Cookies are small text files placed on your device (computer, smartphone, or tablet) by websites that you visit. 
            They are widely used to make websites function efficiently, remember user preferences between visits, and deliver 
            relevant content and advertisements.
          </p>
        </section>

        {/* GOOGLE ADSENSE DISCLOSURE */}
        <section className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 dark:bg-purple-950/20 space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white m-0">
            Google AdSense & DoubleClick Cookies
          </h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on QRLoop. Specifically:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Google uses the <strong>DoubleClick DART cookie</strong> to serve ads to visitors based on their visit to QRLoop 
              and other websites across the Internet.
            </li>
            <li>
              You can opt out of personalized advertising at any time by configuring your preferences at{' '}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-600 dark:text-purple-400 font-semibold underline inline-flex items-center gap-1"
              >
                Google Ads Settings <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
            <li>
              Alternatively, you can visit the Network Advertising Initiative opt-out page at{' '}
              <a 
                href="https://www.aboutads.info/choices/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-600 dark:text-purple-400 font-semibold underline inline-flex items-center gap-1"
              >
                www.aboutads.info <ExternalLink className="w-3 h-3" />
              </a> or European Interactive Digital Advertising Alliance at{' '}
              <a 
                href="https://www.youronlinechoices.eu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-600 dark:text-purple-400 font-semibold underline inline-flex items-center gap-1"
              >
                youronlinechoices.eu <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            Managing Cookies in Your Web Browser
          </h2>
          <p>
            Most modern web browsers allow you to control cookie settings through their preferences or settings menus. 
            You can configure your browser to reject all cookies, notify you when a cookie is placed, or delete existing cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies</li>
            <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy & Security &gt; Enhanced Tracking Protection</li>
            <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Prevent cross-site tracking</li>
            <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions</li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Note: Disabling necessary cookies may impair specific features of QRLoop, such as maintaining persistent login sessions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            Contact Us
          </h2>
          <p>
            For any questions or concerns regarding our cookie practices, please review our{' '}
            <button onClick={onNavigateToPrivacy} className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
              Privacy Policy
            </button>{' '}
            or contact us through our{' '}
            <button onClick={onNavigateToContact} className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
              Contact Form
            </button>.
          </p>
        </section>

      </div>

    </div>
  );
}
