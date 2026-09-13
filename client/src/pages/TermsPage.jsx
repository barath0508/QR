import React from 'react';
import { Scale, ArrowLeft, ShieldAlert, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

export default function TermsPage({ onBackToHome, onNavigateToPrivacy, onNavigateToContact }) {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-cyan-500" />
          <span>Legal Agreement & User Responsibilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Please read these terms carefully before creating QR codes or utilizing our redirect infrastructure.
          By accessing QRLoop, you agree to be bound by these provisions.
        </p>
      </div>

      {/* Policy Content Sections */}
      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 text-slate-700 dark:text-slate-300">
        
        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using QRLoop (the "Platform", "Service", or "We"), whether as a registered account holder 
            or an unregistered visitor ("User"), you acknowledge that you have read, understood, and agree to be legally 
            bound by these Terms of Service and our{' '}
            <button onClick={onNavigateToPrivacy} className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
              Privacy Policy
            </button>. 
            If you do not agree, you must immediately discontinue use of the Platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            2. Description of Service & Free Forever Commitment
          </h2>
          <p>
            QRLoop provides users with an online QR code generation engine, vector export tooling (PNG, SVG, PDF), 
            and an HTTP 302 dynamic URL redirection service accompanied by scan telemetry.
          </p>
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-1">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">No 14-Day Expiration Guarantee</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Unlike commercial paywalled services that deactivate dynamic QR codes after a brief trial, dynamic links 
              created on QRLoop remain actively routed without monthly subscription charges or scan caps, subject to 
              compliance with our Acceptable Use Policy.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            3. Acceptable Use Policy & Zero Tolerance for Abuse
          </h2>
          <p>
            Because dynamic QR codes can be distributed on physical media and scanned by millions of consumers, 
            we enforce a zero-tolerance policy against malicious or unlawful behavior. You agree NOT to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Phishing and Fraud:</strong> Redirect users to fraudulent, impersonating, or credential-harvesting websites.
            </li>
            <li>
              <strong>Malware and Exploits:</strong> Point QR codes to downloads containing viruses, trojans, ransomware, or spyware.
            </li>
            <li>
              <strong>Illegal Content:</strong> Distribute links promoting violent extremism, non-consensual imagery, hate speech, or illicit substances.
            </li>
            <li>
              <strong>Infrastructure Overload:</strong> Attempt denial-of-service (DDoS) attacks, unauthorized scraping, or automated spam generation against our redirection API.
            </li>
          </ul>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            ⚠️ Violation of these policies will result in immediate permanent deactivation of the offending short links, 
            account termination, and potential referral to cybersecurity enforcement authorities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            4. Intellectual Property Rights
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Your Content & Logos:</strong> You retain 100% full ownership, trademark rights, and copyright 
              over the URLs you submit, the custom brand logos you upload, and any printed materials you produce with generated QR codes.
            </li>
            <li>
              <strong>QRLoop Intellectual Property:</strong> All software architecture, branding, vector rendering algorithms, 
              source code, visual designs, and documentation are the proprietary property of QRLoop Technologies and its licensors.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            5. Disclaimer of Warranties
          </h2>
          <p>
            QRLoop is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties 
            of any kind, either express or implied. While we maintain a 99.9% uptime target via distributed edge servers, 
            we do not warrant that service will be uninterrupted, error-free, or invulnerable to external network outages. 
            Users are strongly advised to scan and test all generated QR codes on physical test prints before committing 
            to high-volume commercial print runs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, QRLoop and its officers, creators, and affiliates shall not be liable 
            for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, 
            commercial printing expenses, business interruption, or loss of data) arising from the use or inability 
            to use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            7. Modifications to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. When modifications occur, we will revise the "Last Revised" 
            timestamp at the top of this document. Continued use of QRLoop following any modifications constitutes your 
            affirmative acceptance of the amended terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            8. Questions & Contact Information
          </h2>
          <p>
            For legal inquiries, abuse reporting, or clarification of these terms, please contact our administrative team:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-1">
            <p className="font-semibold text-slate-900 dark:text-white">QRLoop Legal & Compliance Desk</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Abuse Reports: <a href="mailto:abuse@qrloop.io" className="text-cyan-600 dark:text-cyan-400 underline">abuse@qrloop.io</a></p>
            <p className="text-xs text-slate-600 dark:text-slate-400">General Contact: <button onClick={onNavigateToContact} className="text-cyan-600 dark:text-cyan-400 underline">Contact Form</button></p>
          </div>
        </section>

      </div>

    </div>
  );
}
