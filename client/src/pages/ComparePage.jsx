import React from 'react';
import { Check, X, Shield, Zap, AlertTriangle, ArrowRight, Sparkles, QrCode, HelpCircle, FileCheck, Search } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import Breadcrumb from '../components/Breadcrumb';

export default function ComparePage({ onNavigateToStudio, onBackToHome }) {
  const comparisonData = [
    {
      feature: 'Dynamic QR Codes (Edit URL Anytime)',
      qrloop: '100% Free & Permanent',
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
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[{ label: 'Why Free vs Paid' }]}
          onNavigateHome={onBackToHome}
        />
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>The Truth About Online QR Generators</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Why Pay $35 a Month Just to Point a QR Code to a Website?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Most QR generator websites lure you in with "free" dynamic codes, wait until you print thousands of stickers or menus, and then hold your links hostage behind an aggressive monthly subscription. Here is why that model is broken and how QRLoop fixes it permanently.
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
              How the 14-Day "Trial Trap" Works in the Wild
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              1. You design a nice code for your food truck, pop-up store, or business cards and download it without seeing any price tag. <br />
              2. You spend $300 at a local print shop printing acrylic table tents, flyers, or window decals. <br />
              3. Exactly 14 days later, the code stops opening your Instagram or menu. Instead, scanners see: <em>"This trial has ended. The owner must pay $35/month to unlock."</em> <br />
              <strong>At QRLoop, we refuse to play that game.</strong> Your dynamic shortcodes are stored in a resilient database with lifetime persistence. We will never deactivate your printed codes.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 overflow-hidden shadow-md dark:shadow-2xl backdrop-blur-xl">
        <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-dark-950/40">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Feature Comparison Matrix</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">See how QRLoop stacks up against commercial alternatives</p>
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

        {/* Trademark Disclaimer */}
        <div className="px-6 py-3 bg-slate-100/60 dark:bg-dark-900/60 border-t border-slate-200/60 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400">
          <p>
            * Disclaimer: All trademarks, service marks, and company names (including QRCode Monkey, Bitly, and Beaconstac/Uniqode) are the property of their respective owners. Mention of them is for comparative identification purposes only under nominative fair use and does not imply endorsement, affiliation, or sponsorship. Competitor pricing and features reflect publicly advertised tiers as of 2026.
          </p>
        </div>

        {/* CTA in table footer */}
        <div className="p-6 bg-slate-50 dark:bg-dark-950/60 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <Shield className="w-4 h-4 text-brand-500" />
            <span>Join thousands of creators, small businesses, and developers using QRLoop.</span>
          </div>
          <button
            onClick={onNavigateToStudio}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:brightness-110 text-dark-950 font-bold text-xs flex items-center gap-2 shadow-glow-emerald transition-transform duration-150 will-change-transform cursor-pointer"
          >
            <span>Create Your Free Dynamic QR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AdBanner type="leaderboard" />

      {/* Practical Advice Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white text-center">
          Three Sanity Checks Before You Send Any QR Code to Print
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">1. Inspect the Short URL</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Open your phone camera and scan the code on your screen before printing. Look at the domain that appears. If it routes through a company with a pricing page advertising 14-day trials, that code will shut off unless you pay them.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <FileCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">2. Demand Vector SVG</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Never send a screenshot or low-res PNG to your print shop. Standard raster images get fuzzy when scaled up. Always download a clean, mathematical vector SVG from QRLoop to ensure pinpoint laser cutting and sharp offset ink.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">3. Check the Quiet Zone</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Make sure there are at least 4 modules of blank background space around the perimeter. Many designers accidentally crowd illustrations or borders right up to the corner squares, making older phone cameras fail to lock focus.
            </p>
          </div>
        </div>
      </div>

      {/* Common Questions FAQ */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white text-center">
          Straight Answers to Common Questions
        </h3>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-200">How is QRLoop able to offer free dynamic QR codes indefinitely?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Routing an HTTP 302 redirect takes fractions of a millisecond on modern serverless edge infrastructure. By keeping our architecture clean and letting tasteful Google AdSense placements fund our hosting, we can comfortably run QRLoop for millions of scans without charging you a penny.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-200">What happens when I change the destination URL in my dashboard?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Your physical printed QR code never changes. The code itself holds your permanent short link (e.g. <code>/r/summer-menu</code>). When a customer scans it, our edge server checks your latest target URL in real-time and routes the user there instantly.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-200">Can I self-host the QRLoop engine on my own servers?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes! The backend is open and built with Node.js, Express, and PostgreSQL (via Supabase) with local SQLite fallback. You can run your own instance with zero proprietary vendor lock-in.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
