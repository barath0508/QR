import React from 'react';
import { QrCode, Github, Heart, Shield, Zap, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-dark-950 text-slate-600 dark:text-slate-400 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyanGlow-500 flex items-center justify-center shadow-xs">
                <QrCode className="w-4 h-4 text-dark-950 stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-lg text-slate-900 dark:text-white">
                QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyanGlow-500">Loop</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The modern open-source dynamic QR code platform with sub-second redirect tracking, deep analytics, and zero-fee custom styling.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Shield className="w-3.5 h-3.5 text-brand-500" />
              <span>No expired scans. Free forever.</span>
            </div>
          </div>

          {/* QR Code Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">Supported Formats</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dynamic-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Dynamic Website URLs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('static-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Instant Wi-Fi Access Points
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('static-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Digital vCard Contact Cards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('static-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Plain Text & Cryptographic Keys
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('static-qr')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Pre-filled Email & SMS Prompts
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Comparisons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">Alternatives & Comparisons</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  QRLoop vs QRCode Monkey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  QRLoop vs Bitly Dynamic QRs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  QRLoop vs Uniqode / Beaconstac
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Zero Subscription Paywall Model
                </button>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">QR Code Use Cases</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('qr-code-for-restaurants')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Restaurant Menu QR Codes</button></li>
              <li><button onClick={() => onNavigate('qr-code-for-events')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Event QR Codes</button></li>
              <li><button onClick={() => onNavigate('qr-code-for-wifi')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Wi-Fi QR Codes</button></li>
              <li><button onClick={() => onNavigate('qr-code-for-business-cards')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Business Card QR Codes</button></li>
            </ul>
          </div>

          {/* Features & Developer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">Core Engine</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-cyan-500" />
                <span>302 High-Speed Redirector</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-brand-500" />
                <span>Vector SVG & Print-Ready PDF</span>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Destination URL Hot-Swapping
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  Country & Device Scan Telemetry
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} QRLoop Studio. Crafted with modern web standards.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 dark:hover:text-slate-300 cursor-pointer">Privacy Guarantee</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-300 cursor-pointer">Terms of Use</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-300 cursor-pointer">API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
