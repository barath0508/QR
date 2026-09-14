import React from 'react';
import { QrCode, Github, Heart, Shield, Zap, Sparkles, Mail, FileText, Cookie, Info } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (tab) => (e) => {
    e.preventDefault();
    onNavigate(tab);
  };

  return (
    <footer role="contentinfo" className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-dark-950 text-slate-700 dark:text-slate-300 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Footer Navigation" className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* 1. Brand Column */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <a 
              href="/"
              onClick={handleLinkClick('home')} 
              className="inline-flex items-center gap-2.5 cursor-pointer group"
              aria-label="QRLoop Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyanGlow-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <QrCode className="w-4 h-4 text-dark-950 stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-lg text-slate-900 dark:text-white">
                QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyanGlow-500">Loop</span>
              </span>
            </a>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              The modern open dynamic QR platform with sub-50ms redirects, privacy-first telemetry, and vector print downloads.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <Shield className="w-3.5 h-3.5 text-brand-500" />
              <span>Lifetime active redirects. No paywall.</span>
            </div>
            <div className="pt-1">
              <a
                href="https://github.com/barath0508/QR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="QRLoop Source Code on GitHub"
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Open Source on GitHub</span>
              </a>
            </div>
          </div>

          {/* 2. QR Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              QR Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="/dynamic-qr"
                  onClick={handleLinkClick('dynamic-qr')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Dynamic QR Studio
                </a>
              </li>
              <li>
                <a 
                  href="/static-qr"
                  onClick={handleLinkClick('static-qr')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Free Static Generator
                </a>
              </li>
              <li>
                <a 
                  href="/dashboard"
                  onClick={handleLinkClick('dashboard')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  QR Management Portal
                </a>
              </li>
              <li>
                <a 
                  href="/blog"
                  onClick={handleLinkClick('blog')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Guides & Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="/compare"
                  onClick={handleLinkClick('compare')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Why Free vs Paid Tools
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Solutions & Use Cases */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Solutions
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="/qr-code-for-restaurants"
                  onClick={handleLinkClick('qr-code-for-restaurants')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Restaurant Menus
                </a>
              </li>
              <li>
                <a 
                  href="/qr-code-for-events"
                  onClick={handleLinkClick('qr-code-for-events')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Event Registration
                </a>
              </li>
              <li>
                <a 
                  href="/qr-code-for-wifi"
                  onClick={handleLinkClick('qr-code-for-wifi')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Instant Wi-Fi Access
                </a>
              </li>
              <li>
                <a 
                  href="/qr-code-for-business-cards"
                  onClick={handleLinkClick('qr-code-for-business-cards')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Digital Business Cards
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Company & Mission */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="/about"
                  onClick={handleLinkClick('about')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  About QRLoop
                </a>
              </li>
              <li>
                <a 
                  href="/contact"
                  onClick={handleLinkClick('contact')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Contact & Support
                </a>
              </li>
              <li>
                <a 
                  href="/compare"
                  onClick={handleLinkClick('compare')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Why Free vs Paid
                </a>
              </li>
              <li>
                <a 
                  href="/blog"
                  onClick={handleLinkClick('blog')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Knowledge Hub
                </a>
              </li>
              <li>
                <a 
                  href="/community" 
                  onClick={handleLinkClick('community')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          {/* 5. Legal, Trust & Compliance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="/privacy" 
                  onClick={handleLinkClick('privacy')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left font-semibold text-emerald-800 dark:text-emerald-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  onClick={handleLinkClick('terms')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left font-semibold text-cyan-800 dark:text-cyan-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/cookies" 
                  onClick={handleLinkClick('cookies')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left font-semibold text-amber-800 dark:text-amber-300"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={handleLinkClick('contact')} 
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors block text-left"
                >
                  Report Abuse
                </a>
              </li>
            </ul>
          </div>

        </nav>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} QRLoop Technologies. Built for creators and businesses worldwide.</p>
            <nav aria-label="Legal and Compliance Links" className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a 
                href="/privacy" 
                onClick={handleLinkClick('privacy')} 
                className="hover:text-slate-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                onClick={handleLinkClick('terms')} 
                className="hover:text-slate-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                Terms of Service
              </a>
              <a 
                href="/cookies" 
                onClick={handleLinkClick('cookies')} 
                className="hover:text-slate-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                Cookie Settings
              </a>
              <a 
                href="/community" 
                onClick={handleLinkClick('community')} 
                className="hover:text-slate-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                Community
              </a>
              <a 
                href="/about" 
                onClick={handleLinkClick('about')} 
                className="hover:text-slate-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                About
              </a>
              <a 
                href="/contact" 
                onClick={handleLinkClick('contact')} 
                className="hover:text-slate-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                Contact
              </a>
            </nav>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 text-center sm:text-left">
            QR Code is a registered trademark of DENSO WAVE INCORPORATED in Japan and other countries. All third-party trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
