import React from 'react';
import { ArrowRight, CheckCircle2, QrCode, ShieldCheck, Sparkles } from 'lucide-react';

const useCases = {
  'qr-code-for-restaurants': {
    label: 'For restaurants',
    title: 'QR Code Generator for Restaurant Menus',
    description: 'Create a branded restaurant menu QR code that you can update whenever your menu changes. Track scans without reprinting table cards, posters, or takeaway packaging.',
    benefits: ['Update seasonal menus after printing', 'Add your restaurant logo and brand colors', 'Track scans by device and location', 'Export print-ready SVG and PDF files'],
    steps: ['Create a dynamic QR code', 'Add your menu URL and brand styling', 'Download it for table tents, windows, or packaging'],
    cta: 'Create a restaurant menu QR code',
  },
  'qr-code-for-events': {
    label: 'For events',
    title: 'QR Code Generator for Events and Campaigns',
    description: 'Use one editable QR code for event registration, schedules, tickets, feedback, or changing campaign pages. Keep printed event materials useful from launch day to the final session.',
    benefits: ['Switch destinations as the event schedule changes', 'Share registration, maps, menus, or feedback forms', 'Measure interest from printed promotions', 'Create polished codes for posters and badges'],
    steps: ['Choose a dynamic QR code', 'Paste your registration or event URL', 'Customize, export, and place it on event materials'],
    cta: 'Create an event QR code',
  },
  'qr-code-for-wifi': {
    label: 'For Wi-Fi',
    title: 'Free Wi-Fi QR Code Generator',
    description: 'Let guests join a Wi-Fi network by scanning instead of typing a long password. Generate a static Wi-Fi QR code instantly with no account and no expiration.',
    benefits: ['Works for cafes, offices, hotels, and homes', 'No login required for static Wi-Fi codes', 'Download PNG, SVG, or PDF formats', 'Print a clean code with your logo and colors'],
    steps: ['Open the static QR generator', 'Choose the Wi-Fi template and enter network details', 'Download and display the code near your reception or router'],
    cta: 'Create a Wi-Fi QR code',
    static: true,
  },
  'qr-code-for-business-cards': {
    label: 'For business cards',
    title: 'QR Code Generator for Digital Business Cards',
    description: 'Turn a printed business card into a useful digital introduction. Send people to your profile, portfolio, contact page, or vCard while keeping the printed design compact.',
    benefits: ['Link to a portfolio, profile, or contact card', 'Change a dynamic destination without reprinting cards', 'Add a logo that blends naturally into the QR code', 'Export a sharp SVG for professional printing'],
    steps: ['Choose a destination or vCard template', 'Apply your brand colors and logo', 'Export the QR code and add it to your card design'],
    cta: 'Create a business card QR code',
  },
};

export default function UseCasePage({ slug, onNavigateToDynamic, onNavigateToStatic, onBackToHome }) {
  const content = useCases[slug] || useCases['qr-code-for-restaurants'];
  const navigateToGenerator = content.static ? onNavigateToStatic : onNavigateToDynamic;

  return (
    <div className="space-y-16 pb-16 pt-8">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>{content.label} • QRLoop</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {content.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {content.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button onClick={navigateToGenerator} className="h-12 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm">
            <QrCode className="w-4 h-4" />
            <span>{content.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onBackToHome} className="h-12 px-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 font-semibold text-sm">
            Explore QRLoop
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl border border-emerald-500/20 bg-white dark:bg-dark-900/70 shadow-sm">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-5">Why use QRLoop?</h2>
          <ul className="space-y-4">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-7 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-white dark:to-dark-900/70 shadow-sm">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-5">Create yours in three steps</h2>
          <ol className="space-y-4">
            {content.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold text-xs flex items-center justify-center flex-shrink-0">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-7 sm:p-9 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-900/70 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Designed for real-world printing</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              QRLoop keeps codes readable with customizable contrast, quiet-zone protection, logo masking, and vector exports. Dynamic codes can be edited after printing; static codes are available when you need permanent offline data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
