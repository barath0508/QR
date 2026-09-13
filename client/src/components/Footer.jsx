import React from 'react';
import { QrCode, Github, Heart, Shield, Zap, Sparkles, Mail, FileText, Cookie, Info } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-dark-950 text-slate-600 dark:text-slate-400 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* 1. Brand Column */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyanGlow-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <QrCode className="w-4 h-4 text-dark-950 stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-lg text-slate-900 dark:text-white">
                QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyanGlow-500">Loop</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The modern open dynamic QR platform with sub-50ms redirects, privacy-first telemetry, and vector print downloads.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Shield className="w-3.5 h-3.5 text-brand-500" />
              <span>Lifetime active redirects. No paywall.</span>
            </div>
            <div className="pt-1">
              <a
                href="https://github.com/barath0508/QR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Open Source on GitHub</span>
              </a>
            </div>
          </div>

          {/* 2. QR Generators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              QR Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dynamic-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Dynamic QR Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('static-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Free Static Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  QR Management Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Guides & Tutorials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Why Free vs Paid Tools
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Industry Use Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('qr-code-for-restaurants')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Restaurant Menus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qr-code-for-events')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Event Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qr-code-for-wifi')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Instant Wi-Fi Access
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qr-code-for-business-cards')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Digital Business Cards
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Company & Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-emerald-500" />
                  <span>About QRLoop</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-cyan-500" />
                  <span>Contact & Support</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Knowledge Hub
                </button>
              </li>
            </ul>
          </div>

          {/* 5. Legal & Regulatory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-cyan-500" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left flex items-center gap-1.5">
                  <Cookie className="w-3 h-3 text-amber-500" />
                  <span>Cookie Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors text-left">
                  Report Abuse / Security
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} QRLoop Technologies. Built for creators and businesses worldwide.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('cookies')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Cookie Settings
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              About
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
