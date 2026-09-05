import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  Printer, 
  Smartphone, 
  Share2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function BlogPage({ onNavigateToDynamic, onNavigateToStatic }) {
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const articles = [
    {
      id: 'paywall-trap',
      category: 'Industry Warning',
      badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      title: 'The 14-Day QR Paywall Trap: How Commercial Services Hold Your Links Hostage',
      readTime: '4 min read',
      date: 'Sept 2026',
      summary: 'Millions of businesses print dynamic QR codes on brochures and restaurant menus, only to find them deactivated 14 days later unless they pay $35/month.',
      content: `
### The "Free Trial" Bait-and-Switch

Dynamic QR codes are widely advertised as "Free" across search engines. You sign up, customize colors, add your brand logo, and download a high-res file. You take the file to a print shop and order:
- 5,000 marketing brochures
- 50 acrylic restaurant table standees
- Custom product packaging boxes

Two weeks later, customers start scanning the QR codes and see an error screen:
> *"This dynamic QR code belongs to a free trial account that has expired. Please upgrade to Pro for $35.00/month to reactivate this link."*

Because your printed materials are already distributed in the real world, you are effectively forced to pay a monthly ransom or throw away thousands of dollars in printed assets.

### Why Does This Happen?

Unlike static QR codes (which encode the destination directly), a dynamic QR code points to a redirect server owned by the generator service. If that service chooses to disable the redirect URL, your printed QR code becomes a dead link.

### The QRLoop Philosophy: Open, Free, and Unlocked

At QRLoop, we believe that an HTTP 302 redirect should never cost $35/month. Modern cloud infrastructure and lightweight databases make running redirects virtually free. QRLoop is committed to:
1. **Lifetime Active Links**: Your dynamic QR codes will never expire or be locked behind a subscription paywall.
2. **Unlimited Scans**: No monthly scan quotas that deactivate your links during peak viral campaigns.
3. **Open Architecture**: Powered by open-source Node.js and Supabase/PostgreSQL.
      `
    },
    {
      id: 'dynamic-vs-static',
      category: 'Best Practices',
      badgeColor: 'bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-500/20',
      title: 'Dynamic vs Static QR Codes: The Definitive Guide for Businesses',
      readTime: '5 min read',
      date: 'Sept 2026',
      summary: 'Understand the fundamental differences between static and dynamic codes, and choose the right format for your physical prints.',
      content: `
### The Core Difference

When choosing a QR code format, the most important question is: **Do you ever need to change the destination, or track how many people scan it?**

#### 1. Static QR Codes
In a static QR code, your exact data (e.g. \`https://mywebsite.com\` or Wi-Fi password \`WIFI:S:MyNet;P:Secret;;\`) is burned directly into the black-and-white pixel matrix.
- **Pros**: Works 100% offline, zero dependencies on any server, can never be disabled by a third party.
- **Cons**: Cannot be edited once printed. Cannot collect scan analytics (number of scans, devices, locations). The longer the text, the denser and harder to scan the code becomes.
- **Best For**: Wi-Fi badges, business cards (vCards), Bitcoin/crypto addresses, permanent asset tags.

#### 2. Dynamic QR Codes
In a dynamic QR code, the pattern only encodes a short redirect link (e.g. \`https://qrloop.io/r/summer-promo\`). When scanned, our server immediately checks the database and forwards the visitor to your target website.
- **Pros**: Destination can be updated anytime without re-printing. Scans are tracked in real-time (device, OS, location). The pattern remains clean and easy to scan from long distances.
- **Cons**: Requires an active internet connection to redirect.
- **Best For**: Restaurant menus, product packaging, marketing flyers, billboards, exhibition booths.
      `
    },
    {
      id: 'privacy-analytics',
      category: 'Analytics & Tech',
      badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
      title: 'How to Track QR Code Scans Accurately Without Cookies or Privacy Violations',
      readTime: '3 min read',
      date: 'Aug 2026',
      summary: 'Learn how modern serverless HTTP redirect engines log valuable marketing insights while keeping user data anonymized and compliant with GDPR.',
      content: `
### Zero-Cookie Telemetry

Traditional web analytics rely on tracking cookies, JavaScript snippets, and third-party trackers. However, when a user scans a physical QR code with their mobile phone camera, the scan occurs before any webpage loads.

By measuring the HTTP 302 handshake at the server level, QRLoop provides rich insights without planting persistent cookies:

1. **Device Breakdown**: The browser sends a standard \`User-Agent\` header indicating whether the scan came from an iPhone (Mobile Safari), an Android device (Chrome Mobile), or a desktop scanner.
2. **Operating System**: Differentiates between iOS, Android, macOS, and Windows.
3. **Geographic Distribution**: The client IP address is mapped to an approximate country and city using GeoIP lookup tables.
4. **IP Anonymization**: The last octet of the IP address is masked (e.g. \`192.168.1.xxx\`), ensuring full GDPR and privacy compliance without storing personal identifiers.
      `
    },
    {
      id: 'print-specifications',
      category: 'Design & Print',
      badgeColor: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
      title: 'Professional QR Code Print Specifications: DPI, Contrast, and Quiet Zones',
      readTime: '4 min read',
      date: 'Aug 2026',
      summary: 'Essential rules for graphic designers and printers to ensure your printed QR codes scan smoothly on every smartphone camera.',
      content: `
### The 10:1 Scanning Distance Rule

A common mistake in graphic design is printing QR codes too small. Follow the universal 10:1 rule:
> **Scanning Distance ÷ 10 = Minimum QR Code Width**

- Table Standee (viewed from 10 inches / 25 cm away): Minimum **1 inch (2.5 cm)** wide.
- Poster / Banner (viewed from 10 feet / 3 meters away): Minimum **1 foot (30 cm)** wide.

### Contrast and Inverted Colors

Smartphone camera sensors are optimized to find **dark modules on a light background**.
- **Always ensure high contrast**: Dark navy, black, or emerald on white or light cream.
- **Avoid inverted codes**: White QR modules on a dark background can fail to scan on older budget Android phones.
- **The Quiet Zone**: Keep a margin of at least 4 module widths of blank space around the QR code so the camera's computer vision algorithm can detect the boundary.
- **Export in Vector SVG**: Always use SVG vector export for large-format commercial printing to prevent pixelation.
      `
    }
  ];

  const activeArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Article Detail View */}
      {activeArticle ? (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="space-y-3">
            <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${activeArticle.badgeColor}`}>
              {activeArticle.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-200 dark:border-white/5">
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {activeArticle.content}
          </div>

          {/* Bottom Action Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Ready to build your QR code?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Generate a free dynamic or static code in under 30 seconds.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToStatic}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
              >
                Static Generator
              </button>
              <button
                onClick={onNavigateToDynamic}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 text-dark-950 shadow-glow-emerald"
              >
                Dynamic Studio →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Blog Index View */
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
              <span>Developer & Marketer Knowledge Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              QR Code Guides & Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Technical guides, print preparation tutorials, and the truth about commercial QR code paywalls.
            </p>
          </div>

          {/* Featured Article Card */}
          <div 
            onClick={() => setSelectedArticleId(articles[0].id)}
            className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 p-6 sm:p-8 backdrop-blur-md hover:border-brand-500/40 transition-all shadow-sm dark:shadow-xl cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${articles[0].badgeColor}`}>
                  {articles[0].category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {articles[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {articles[0].summary}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{articles[0].date}</span>
                  <span>•</span>
                  <span>{articles[0].readTime}</span>
                </div>
              </div>

              <button className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 group-hover:bg-brand-500 group-hover:text-dark-950 transition-all">
                <span>Read Full Guide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Remaining Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(1).map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 p-5 backdrop-blur-md hover:border-brand-500/40 transition-all shadow-xs dark:shadow-none cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${art.badgeColor}`}>
                      {art.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdBanner type="leaderboard" />

    </div>
  );
}
