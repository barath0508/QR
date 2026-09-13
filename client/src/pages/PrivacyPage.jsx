import React from 'react';
import { Shield, Lock, Eye, CheckCircle2, ArrowLeft, ExternalLink, HelpCircle } from 'lucide-react';

export default function PrivacyPage({ onBackToHome, onNavigateToCookies, onNavigateToContact }) {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Privacy Policy & Regulatory Disclosures</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          At QRLoop, we respect your privacy and are committed to complete transparency regarding our data handling, 
          telemetry logging, advertising networks, and cookie practices.
        </p>
      </div>

      {/* Key Highlights Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
          <Lock className="w-5 h-5 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">IP Anonymization</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Redirect scan telemetry automatically strips or masks the final octet of IP addresses before storage.
          </p>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
          <Eye className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero Data Selling</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We never sell, rent, or trade your personal information or redirect destinations to third-party brokers.
          </p>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-xs space-y-2">
          <CheckCircle2 className="w-5 h-5 text-purple-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">GDPR & CCPA Ready</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Full compliance with global privacy regulations, granting full access, correction, and deletion rights.
          </p>
        </div>
      </div>

      {/* Policy Content Sections */}
      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 text-slate-700 dark:text-slate-300">
        
        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p>
            When you interact with the QRLoop service (including our website, dynamic QR generation studio, 
            and short redirect URLs), we collect information in the following ways:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Account Information:</strong> If you register an account, we collect your email address, 
              name (optional), and encrypted password credentials to enable saved QR code management across sessions.
            </li>
            <li>
              <strong>QR Code Content & Configurations:</strong> Target URLs, module shapes, custom logo assets, 
              color preferences, and styling parameters required to generate and render your QR codes.
            </li>
            <li>
              <strong>Scan Telemetry (When a QR code is scanned):</strong> When a user scans a dynamic QR code generated through QRLoop, 
              our edge redirect servers collect minimal technical diagnostics: device category (mobile, tablet, desktop), 
              operating system, browser type, approximate geographic region (country and city level), and timestamp. 
              <strong>No personal identifiers, camera feeds, or GPS coordinates are ever collected or stored.</strong>
            </li>
          </ul>
        </section>

        {/* GOOGLE ADSENSE DISCLOSURE - CRITICAL FOR APPROVAL */}
        <section className="p-6 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white m-0">
              2. Google AdSense & Third-Party Advertising Disclosures
            </h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300">
            QRLoop displays advertisements served by <strong>Google AdSense</strong> and authorized third-party ad networks. 
            In compliance with Google AdSense Publisher Policies and international regulations, please review the following required disclosures:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet.
            </li>
            <li>
              <strong>DoubleClick DART Cookie:</strong> Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to QRLoop and/or other sites across the World Wide Web.
            </li>
            <li>
              <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting{' '}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline inline-flex items-center gap-1"
              >
                Google Ads Settings <ExternalLink className="w-3 h-3" />
              </a>. 
              Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
              <a 
                href="https://www.aboutads.info/choices/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-600 dark:text-emerald-400 font-semibold underline inline-flex items-center gap-1"
              >
                www.aboutads.info <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
            <li>
              <strong>Ad Partner Transparency:</strong> Advertisers and ad networks on QRLoop may use cookies, JavaScript, or Web Beacons to measure the effectiveness of their advertisements and personalize the advertising content you see. QRLoop has no access to or control over these cookies used by third-party advertisers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            3. Cookies and Local Storage
          </h2>
          <p>
            We use browser cookies and HTML5 local storage to enhance your browsing experience, remember your dark/light mode preference, 
            maintain authenticated user sessions, and gather aggregated performance analytics.
          </p>
          <p>
            For a comprehensive breakdown of all cookies we utilize, please review our dedicated{' '}
            <button 
              onClick={onNavigateToCookies} 
              className="text-emerald-600 dark:text-emerald-400 font-semibold underline"
            >
              Cookie Policy
            </button>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            4. Analytics Services (Google Analytics & Clarity)
          </h2>
          <p>
            We utilize <strong>Google Analytics (GA4)</strong> and <strong>Microsoft Clarity</strong> to analyze user behavior 
            and improve platform stability. These tools record website interaction metrics (such as page views, scroll depth, and error occurrences). 
            All data transmitted to analytics providers is pseudonymized and governed by their respective privacy terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            5. Your Rights Under GDPR and CCPA / CPRA
          </h2>
          <p>
            Regardless of your geographical location, QRLoop grants you full authority over your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Right of Access:</strong> Request a copy of the personal data we store in connection with your account.</li>
            <li><strong>Right to Rectification:</strong> Request correction of any inaccurate or incomplete records.</li>
            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request immediate deletion of your account, created QR codes, and associated scan history.</li>
            <li><strong>Right to Restrict or Object:</strong> Restrict processing or object to the analytical evaluation of your data.</li>
            <li><strong>Non-Discrimination:</strong> We will never deny services, charge different prices, or degrade quality if you exercise your privacy rights.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            6. Data Security & Storage
          </h2>
          <p>
            All network communication between your browser and QRLoop is encrypted in transit using industry-standard 
            TLS 1.3 cryptographic protocols. Databases are protected by encrypted storage at rest, strict Row-Level Security (RLS), 
            and least-privilege administrative access policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            7. Contacting Our Data Privacy Team
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, wish to exercise your legal data rights, 
            or have feedback regarding our compliance, please reach out to us:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-1">
            <p className="font-semibold text-slate-900 dark:text-white">QRLoop Privacy & Security Team</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Email: <a href="mailto:privacy@qrloop.io" className="text-emerald-600 dark:text-emerald-400 underline">privacy@qrloop.io</a></p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Support Desk: <button onClick={onNavigateToContact} className="text-emerald-600 dark:text-emerald-400 underline">Contact Support</button></p>
          </div>
        </section>

      </div>

    </div>
  );
}
