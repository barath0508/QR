import React from 'react';
import { ArrowRight, CheckCircle2, QrCode, ShieldCheck, Sparkles, Utensils, Calendar, Wifi, Contact } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const useCases = {
  'qr-code-for-restaurants': {
    label: 'Restaurant Menus',
    title: 'Dynamic QR Codes for Restaurant & Bar Menus',
    description: 'Never throw away expensive acrylic table tents or wooden standees just because the daily specials changed or salmon went out of stock. Update your digital menu URL from your phone behind the bar in 10 seconds.',
    benefits: [
      'Change prices, seasonal dishes, and cocktail menus anytime without reprinting',
      'Embed your restaurant logo and match your interior decor brand colors',
      'Track peak dining hours and scan traffic by day of the week',
      'Download sharp vector SVG and A4 table standee PDFs ready for printing'
    ],
    steps: [
      'Create a free dynamic QR code and paste your online menu or PDF link',
      'Customize dot styling and embed your restaurant badge',
      'Print on acrylic stands, table tents, coasters, or window banners'
    ],
    cta: 'Create a Restaurant Menu QR Code',
    proTip: 'Print pro tip: Tabletop standees are scanned from about 12 inches away. A 1.2-inch (30mm) QR code is the sweet spot for instant camera focus under dim candle or mood lighting.'
  },
  'qr-code-for-events': {
    label: 'Conferences & Events',
    title: 'Dynamic QR Codes for Events, Conferences & Festivals',
    description: 'When workshop rooms change on Day 2 of a tech summit or weather moves an outdoor concert stage, you cannot reprint 2,000 attendee lanyards. With a dynamic QR code, every badge points to your live real-time schedule.',
    benefits: [
      'Reroute badge links as event schedules, room allocations, and speakers shift',
      'Collect feedback, handle live polling, and share presentation slide decks',
      'Measure attendance interest from physical flyers, badges, and exhibition banners',
      'Lifetime active links so attendees can access slides weeks after the event ends'
    ],
    steps: [
      'Generate an editable dynamic QR code pointing to your event hub',
      'Apply high-contrast event branding and export vector SVG',
      'Place the code on attendee lanyards, roll-up banners, and stage screens'
    ],
    cta: 'Create an Event QR Code',
    proTip: 'Event pro tip: For large roll-up stage banners scanned from 10 to 15 feet away, print your QR code at least 12 to 18 inches wide so attendees can scan from the back of the auditorium.'
  },
  'qr-code-for-wifi': {
    label: 'Instant Guest Wi-Fi',
    title: 'One-Tap Wi-Fi QR Code Generator for Guests',
    description: 'Stop shouting "Capital X, lowercase w, underscore 99" across a noisy café counter. Generate a clean Wi-Fi QR code that lets customers tap and connect in 1 second with zero typing.',
    benefits: [
      'Works for cafes, hotel lobbies, co-working spaces, Airbnb rentals, and home offices',
      'No account, no login, and 100% offline security—credentials stay on the device',
      'Download print-ready PNG, SVG, or framed PDF templates ready to frame',
      'Compatible with all modern iOS and Android native camera apps'
    ],
    steps: [
      'Open the static generator and pick the Wi-Fi template',
      'Enter your network SSID name and WPA/WPA2/WPA3 password',
      'Download and frame near your cash register, front desk, or living room'
    ],
    cta: 'Generate a Free Wi-Fi QR Code',
    static: true,
    proTip: 'Security pro tip: Always place your guest Wi-Fi on a separate VLAN or guest network so visitors cannot access private point-of-sale terminals or back-office printers.'
  },
  'qr-code-for-business-cards': {
    label: 'Digital Business Cards',
    title: 'Smart QR Codes for Modern Business Cards & vCards',
    description: 'Traditional paper business cards get lost in wallet bottoms or thrown into desk drawers. Put a sleek dynamic QR code on the back that saves your phone, email, LinkedIn, and booking link directly to their contacts with one tap.',
    benefits: [
      'Route to an interactive vCard, mobile portfolio, or Cal.com booking link',
      'Change your job title, phone number, or company URL without reprinting your cards',
      'Crisp vector SVG printing that never bleeds on matte, gloss, or textured linen cardstock',
      'Add a custom monogram or startup logo directly in the center'
    ],
    steps: [
      'Choose a dynamic link or direct vCard format',
      'Select a dark charcoal or navy colorway that matches your card typography',
      'Export vector SVG and hand it straight to your business card printer'
    ],
    cta: 'Create a Business Card QR Code',
    proTip: 'Print pro tip: Keep your business card QR code at least 0.9 inches (23mm) wide and leave a clean white border (quiet zone) around it so phone cameras can lock on instantly.'
  },
};

export default function UseCasePage({ slug, onNavigateToDynamic, onNavigateToStatic, onBackToHome }) {
  const content = useCases[slug] || useCases['qr-code-for-restaurants'];
  const navigateToGenerator = content.static ? onNavigateToStatic : onNavigateToDynamic;

  return (
    <div className="space-y-16 pb-16 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Solutions', href: '/#solutions', onClick: onBackToHome },
            { label: content.label }
          ]}
          onNavigateHome={onBackToHome}
        />
      </div>

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
          <button onClick={navigateToGenerator} className="h-12 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors">
            <QrCode className="w-4 h-4" />
            <span>{content.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onBackToHome} className="h-12 px-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 font-semibold text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors">
            Explore All Features
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl border border-emerald-500/20 bg-white dark:bg-dark-900/70 shadow-sm">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-5">Why use QRLoop for this?</h2>
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

      {/* Pro Tip Callout */}
      {content.proTip && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-7 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Practical Print Advice</h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {content.proTip}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
