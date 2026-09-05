import React from 'react';
import { Check, X, Shield, Zap, AlertTriangle, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function ComparePage({ onNavigateToStudio }) {
  const comparisonData = [
    {
      feature: 'Dynamic QR Codes (Edit URL Anytime)',
      qrloop: '100% Free & Unlimited',
      monkey: 'Paid Plan ($11.99 - $35/mo)',
      bitly: 'Paid Plan ($35/mo)',
      beacon: 'Paid Plan ($25/mo)',
    },
    {
      feature: 'Scan Expiration Trap',
      qrloop: 'Never Expires (Lifetime Active)',
      monkey: 'Deactivates after 14-day trial',
      bitly: 'Disabled if subscription lapses',
      beacon: 'Disabled after trial',
    },
    {
      feature: 'Monthly Scan Limits',
      qrloop: 'Unlimited Scans',
      monkey: '200 to 1,000 scans limit',
      bitly: '500 scans/mo on basic',
      beacon: '500 scans/mo',
    },
    {
      feature: 'High-Res Vector SVG & Print PDF',
      qrloop: 'Free Lossless Download',
      monkey: 'Free (Static only)',
      bitly: 'Paid Only',
      beacon: 'Paid Only',
    },
    {
      feature: 'Device & Geo Scan Analytics',
      qrloop: 'Included Free',
      monkey: 'Locked behind PRO tier',
      bitly: 'Locked behind PRO tier',
      beacon: 'Locked behind PRO tier',
    },
    {
      feature: 'Center Logo & Custom Eye Styling',
      qrloop: 'Included Free',
      monkey: 'Watermarked or Limited',
      bitly: 'Basic',
      beacon: 'Enterprise Only',
    },
    {
      feature: 'Open Source / Self-Hostable Backend',
      qrloop: 'Yes (Node + Supabase/SQLite)',
      monkey: 'No (Closed Proprietary)',
      bitly: 'No',
      beacon: 'No',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>The Transparent Truth About QR Generators</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Why Pay $35/mo Just to Point a QR Code to a Website?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Most QR code generators lure you in with "free" dynamic codes, let you print thousands of stickers, and then hold your links hostage behind expensive recurring subscriptions.
        </p>
      </div>

      {/* The Danger of Paid QR Paywalls Alert */}
      <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Beware of the 14-Day "Bait and Switch" QR Scam
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have ever printed a dynamic QR code on business cards, restaurant menus, or trade show banners only to discover a broken redirect screen 2 weeks later asking you to upgrade to a monthly plan, you know how frustrating it is.
              <strong> QRLoop exists to fix this permanently:</strong> our dynamic redirect engine is built with open web standards, backed by resilient Supabase or SQLite storage, and will never deactivate your codes.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 overflow-hidden shadow-md dark:shadow-2xl backdrop-blur-xl">
        <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-dark-950/40">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Full Feature Comparison Matrix</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">See how QRLoop compares against the industry giants</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold bg-slate-50/50 dark:bg-dark-950/20">
                <th className="p-4 sm:p-5">Feature / Capability</th>
                <th className="p-4 sm:p-5 text-emerald-700 dark:text-emerald-400 bg-brand-500/10 font-black">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-brand-500" />
                    <span>QRLoop (Free)</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5">QRCode Monkey Pro</th>
                <th className="p-4 sm:p-5">Bitly Dynamic QR</th>
                <th className="p-4 sm:p-5">Uniqode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 bg-brand-500/5 text-emerald-700 dark:text-emerald-300 font-bold">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <span>{row.qrloop}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>{row.monkey}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>{row.bitly}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>{row.beacon}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA in table footer */}
        <div className="p-6 bg-slate-50 dark:bg-dark-950/60 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <Shield className="w-4 h-4 text-brand-500" />
            <span>Join thousands of creators, small businesses, and developers using QRLoop.</span>
          </div>
          <button
            onClick={onNavigateToStudio}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:brightness-110 text-dark-950 font-bold text-xs flex items-center gap-2 shadow-glow-emerald transition-all"
          >
            <span>Create Your Free Dynamic QR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AdBanner type="leaderboard" />

      {/* Common Questions FAQ */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-200">How is QRLoop able to offer free dynamic QRs?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Redirecting an HTTP request is computationally lightweight. We optimize server memory and use non-intrusive developer sponsorships and ads (just like modern open tools) instead of charging users exorbitant recurring subscriptions.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-200">What happens if I change the destination URL?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The printed QR code remains 100% unchanged! The QR code points to your short redirect route (e.g. <code>/r/summer-sale</code>), which looks up the latest destination URL in the database and immediately performs a 302 redirect.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-200">Can I self-host QRLoop for my company?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes! The entire backend is built with Node.js, Express, and Supabase / SQLite. You can host it on your own server or Vercel/Fly.io instance with zero vendor lock-in.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
